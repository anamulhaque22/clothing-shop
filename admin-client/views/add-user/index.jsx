"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
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

export default function AddUser() {
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
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
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

        <div className="text-right text-primary">
          <Link href="/forgot-password">
            <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
              Forgot Password?
            </span>
          </Link>
        </div>

        <button
          type="submit"
          className={"btn mt-2 w-full btn-primary" + (false ? " loading" : "")}
        >
          Login
        </button>
      </form>
    </FormProvider>
  );
}
