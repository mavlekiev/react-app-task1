import { expect } from "vitest";
import { formSchema } from "../../utils/validation";

const createFile = (content: string, name: string, type: string): File => {
  const blob = new Blob([content], { type });
  return new File([blob], name, { type, lastModified: Date.now() });
};

const file = createFile("", "test.png", "image/png");

const validData = {
  name: "John",
  age: 25,
  email: "john@example.com",
  password: "Password1!",
  confirmPassword: "Password1!",
  gender: "male",
  acceptTc: true,
  country: "United States",
  image: [file],
};

describe("formSchema validation", () => {
  test("validates correct data", async () => {
    await expect(formSchema.validate(validData)).resolves.toEqual(validData);
  });

  test("fails when name does not start with uppercase", async () => {
    await expect(
      formSchema.validate({ ...validData, name: "john" }),
    ).rejects.toHaveProperty(
      "errors",
      expect.arrayContaining([
        "Name must start with uppercase letter from English",
      ]),
    );
  });

  test("fails for invalid email", async () => {
    await expect(
      formSchema.validate({ ...validData, email: "invalid" }),
    ).rejects.toHaveProperty(
      "errors",
      expect.arrayContaining(["Invalid email format"]),
    );
  });

  test("fails for weak password", async () => {
    await expect(
      formSchema.validate({
        ...validData,
        password: "lowercase1!",
        confirmPassword: "lowercase1!",
      }),
    ).rejects.toHaveProperty(
      "errors",
      expect.arrayContaining([
        "Password must contain an uppercase letter from English",
      ]),
    );
  });

  test("fails if passwords do not match", async () => {
    await expect(
      formSchema.validate({ ...validData, confirmPassword: "Wrong!" }),
    ).rejects.toHaveProperty(
      "errors",
      expect.arrayContaining(["Passwords must match"]),
    );
  });

  test("validates image format", async () => {
    const badFile = createFile("", "script.exe", "application/x-msdownload");
    await expect(
      formSchema.validate({ ...validData, image: [badFile] }),
    ).rejects.toHaveProperty(
      "errors",
      expect.arrayContaining(["Only .png and .jpg/.jpeg files are allowed"]),
    );
  });

  test("validates image size", async () => {
    const largeFile = new File(
      [new ArrayBuffer(3 * 1024 * 1024)],
      "large.jpg",
      {
        type: "image/jpeg",
      },
    );
    await expect(
      formSchema.validate({ ...validData, image: [largeFile] }),
    ).rejects.toHaveProperty(
      "errors",
      expect.arrayContaining(["File size must be less than 2MB"]),
    );
  });
});
