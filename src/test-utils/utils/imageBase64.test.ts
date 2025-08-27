import { expect } from "vitest";
import { imageToBase64 } from "../../utils/imageToBase64";

const createFile = (content: string, name: string, type: string): File => {
  const blob = new Blob([content], { type });
  return Object.assign(blob, { name, lastModified: Date.now() }) as File;
};

describe("imageToBase64", () => {
  test("converts File to base64 string", async () => {
    const file = createFile("hello", "test.png", "image/png");
    const result = await imageToBase64(file);
    expect(result).toBe("data:image/png;base64,aGVsbG8=");
  });

  test("handles empty file", async () => {
    const file = createFile("", "empty.jpg", "image/jpeg");
    const result = await imageToBase64(file);
    expect(result).toBe("data:image/jpeg;base64,");
  });
});
