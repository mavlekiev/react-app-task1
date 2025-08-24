import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../utils/validation";
import { imageToBase64 } from "../utils/imageToBase64";
import { useAppDispatch } from "../store/store";
import { addEntry } from "../store/formSlice";
import { getPasswordStrength } from "../utils/passwordStrength";
import CountryAutocomplete from "./CountryAutocomplete";

type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTc: boolean;
  image: FileList;
  country: string;
};

/* eslint-disable react/prop-types */

const ControlledForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema) as unknown as Resolver<FormData>,
    mode: "onChange",
  });

  const password = watch("password", "");

  const onSubmit = async (data: FormData) => {
    let imageBase64 = "";
    if (data.image) {
      imageBase64 = await imageToBase64(data.image[0]);
    }

    dispatch(
      addEntry({
        name: data.name,
        age: data.age,
        email: data.email,
        password: data.password,
        gender: data.gender,
        acceptTc: data.acceptTc,
        image: imageBase64,
        country: data.country,
      }),
    );
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">React Hook Form</h2>

      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register("name")} className="border w-full p-2" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          {...register("age", { valueAsNumber: true })}
          className="border w-full p-2"
        />
        {errors.age && <p className="text-red-500">{errors.age.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="border w-full p-2"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className="border w-full p-2"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        {password && <div>Strength: {getPasswordStrength(password)} / 5</div>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          className="border w-full p-2"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div>
        <label>Gender</label>
        <div>
          <label>
            <input type="radio" value="male" {...register("gender")} /> Male
          </label>
          <label className="ml-4">
            <input type="radio" value="female" {...register("gender")} /> Female
          </label>
        </div>
        {errors.gender && (
          <p className="text-red-500">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <CountryAutocomplete
          value={watch("country") || ""}
          onChange={(value) => setValue("country", value)}
        />
        {errors.country && (
          <p className="text-red-500">{errors.country.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="image">Upload Image</label>
        <input
          id="image"
          type="file"
          accept=".png,.jpg,.jpeg"
          {...register("image")}
          className="border w-full p-2"
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
      </div>

      <div>
        <label>
          <input type="checkbox" {...register("acceptTc")} /> Accept T&C
        </label>
        {errors.acceptTc && (
          <p className="text-red-500">{errors.acceptTc.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Submit
      </button>
    </form>
  );
};

export default ControlledForm;
