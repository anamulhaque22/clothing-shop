"use client";
import { ROLES } from "@/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import InputText from "../../components/Input/InputText";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),

  role: yup
    .object()
    .shape({
      id: yup.number().required("Role is required"),
      name: yup.string(),
    })
    .required("Role is required"),
});

export default function EditUser() {
  const [imagePreview, setImagePreview] = useState(null);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: {
        id: 2,
      },
    },
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    // const { data, status } = await fetchAuthLogin(formData);
    // if (status === HTTP_CODES.UNPROCESSABLE_ENTITY) {
    //   Object.keys(data.errors).forEach((key) => {
    //     setError(key, {
    //       type: "manual",
    //       message: data.errors[key],
    //     });
    //   });
    //   return;
    // }
    // if (status === HTTP_CODES.OK) {
    //   setTokensInfo({
    //     token: data.token,
    //     refreshToken: data.refreshToken,
    //     tokenExpires: data.tokenExpires,
    //   });
    //   setUser(data.user);
    // }
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview
      };
      reader.readAsDataURL(file);

      // Manually set the file input value in React Hook Form
      // setValue("avatar", file);
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <div className="flex justify-center mb-4">
          <label htmlFor="avatar" className="cursor-pointer">
            <Image
              src={imagePreview ?? "/images/avatar-placeholder.png"}
              height={130}
              width={130}
              className="rounded-full"
              alt="avatar"
            />
          </label>
          <Controller
            name="avatar"
            render={({ field }) => (
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleImageUpload}
              />
            )}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-x-3 gap-y-4">
          <InputText
            name="firstName"
            type="text"
            containerStyle="mt-0"
            labelTitle="First name"
          />

          <InputText
            name="lastName"
            type="text"
            containerStyle="mt-0 "
            labelTitle="Last name"
          />

          <InputText
            name="email"
            type="email"
            containerStyle="mt-0 "
            labelTitle="Email"
          />

          <div className="form-control w-full">
            <label
              htmlFor="role"
              className={`label font-causten-semi-bold text-base text-text`}
            >
              Select User Role
            </label>
            <select className="select select-bordered w-full focus:outline-none bg-secondary focus:bg-white dark:focus:bg-secondary">
              <option value={ROLES.USER}>User</option>
              <option value={ROLES.ADMIN}>Admin</option>
            </select>
          </div>

          <InputText
            name="password"
            type="password"
            containerStyle="mt-0 "
            labelTitle="Password"
          />

          <InputText
            name="confirmPassword"
            type="password"
            containerStyle="mt-0 "
            labelTitle="Confirm Password"
          />
        </div>

        <div className="text-right text-primary">
          <Link href="/forgot-password">
            <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
              Forgot Password?
            </span>
          </Link>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={"btn mt-2  btn-primary" + (false ? " loading" : "")}
          >
            Login
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
