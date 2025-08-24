import { useState } from "react";
import { formSchema } from "../utils/validation";
import { imageToBase64 } from "../utils/imageToBase64";
import { useAppDispatch } from "../store/store";
import { addEntry } from "../store/formSlice";
import CountryAutocomplete from "./CountryAutocomplete";

type FormData = {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  image: FileList | null;
  acceptTc: boolean;
};

/* eslint-disable react/prop-types */

const UncontrolledForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    country: "",
    image: null,
    acceptTc: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, image: e.target.files }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await formSchema.validate(formData, { abortEarly: false });
      setErrors({});

      let imageBase64 = "";
      if (formData.image && formData.image.length > 0) {
        imageBase64 = await imageToBase64(formData.image[0]);
      }

      dispatch(
        addEntry({
          name: formData.name,
          age: Number(formData.age),
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
          acceptTc: formData.acceptTc,
          image: imageBase64,
          country: formData.country,
        }),
      );
      onClose();
    } catch (err) {
      const fieldErrors: Record<string, string> = {};

      if (isYupValidationError(err)) {
        err.inner.forEach((validationError) => {
          if (validationError.path) {
            fieldErrors[validationError.path] =
              validationError.message || "Validation failed";
          }
        });
      } else if (err instanceof Error) {
        fieldErrors["submit"] = err.message;
      } else {
        fieldErrors["submit"] = "An unknown error occurred";
      }

      setErrors(fieldErrors);
    }
  };

  function isYupValidationError(
    error: unknown,
  ): error is { inner: Array<{ path?: string; message?: string }> } {
    return (
      typeof error === "object" &&
      error !== null &&
      "inner" in error &&
      Array.isArray(error.inner)
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Uncontrolled Form</h2>

      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border w-full p-2"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          className="border w-full p-2"
        />
        {errors.age && <p className="text-red-500">{errors.age}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="border w-full p-2"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="border w-full p-2"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="border w-full p-2"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

      <div>
        <label>Gender</label>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />{" "}
            Male
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />{" "}
            Female
          </label>
        </div>
        {errors.gender && <p className="text-red-500">{errors.gender}</p>}
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <CountryAutocomplete
          value={formData.country}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, country: value }))
          }
        />
        {errors.country && <p className="text-red-500">{errors.country}</p>}
      </div>

      <div>
        <label htmlFor="image">Upload Image</label>
        <input
          id="image"
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={handleImageChange}
          className="border w-full p-2"
        />
        {errors.image && <p className="text-red-500">{errors.image}</p>}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="acceptTc"
            checked={formData.acceptTc}
            onChange={handleChange}
          />{" "}
          Accept T&C
        </label>
        {errors.acceptTc && <p className="text-red-500">{errors.acceptTc}</p>}
      </div>

      {errors.submit && <p className="text-red-500">{errors.submit}</p>}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;
