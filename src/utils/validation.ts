import * as Yup from "yup";

export type ValidationError = Yup.ValidationError;

export const formSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Z]/, "Name must start with uppercase letter from English"),
  age: Yup.number()
    .required("Age is required")
    .typeError("Age must be a number")
    .positive("Age must be positive")
    .integer("Age must be an integer"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain a lowercase letter from English")
    .matches(/[A-Z]/, "Password must contain an uppercase letter from English")
    .matches(/[0-9]/, "Password must contain a number")
    .matches(/[!@#$%^&*]/, "Password must contain a special character"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  gender: Yup.string().required("Gender is required"),
  acceptTc: Yup.boolean()
    .oneOf([true], "You must accept the Terms and Conditions")
    .required("You must accept the Terms and Conditions")
    .defined("You must accept the Terms and Conditions"),
  image: Yup.mixed<FileList>()
    .test("required", "Image is required", (value) => {
      return value instanceof FileList && value.length > 0;
    })
    .test(
      "fileFormat",
      "Only .png and .jpg/.jpeg files are allowed",
      (value) => {
        if (!(value instanceof FileList) || value.length === 0) return true;

        const file = value[0];
        const validTypes = ["image/png", "image/jpeg", "image/jpg"];
        const fileType = file.type;

        if (!fileType) {
          const fileName = file.name.toLowerCase();
          return (
            fileName.endsWith(".png") ||
            fileName.endsWith(".jpg") ||
            fileName.endsWith(".jpeg")
          );
        }

        return validTypes.includes(fileType);
      },
    )
    .test("fileSize", "File size must be less than 2MB", (value) => {
      if (!(value instanceof FileList) || value.length === 0) return true;
      return value[0].size <= 2 * 1024 * 1024;
    }),
});
