"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import InputText from "../../components/Input/InputText";

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Login() {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (formData) => {});
  return (
    <div className="bg-primary h-screen">
      <div className="card mx-auto flex justify-center items-center h-full">
        <div className="px-7 py-10 shadow-xl w-full max-w-lg rounded-xl">
          <h2 className="text-2xl font-semibold mb-2 text-center text-text">
            Login
          </h2>
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <InputText
                  type="text"
                  name="email"
                  placeholder={""}
                  labelTitle="Email address"
                  containerStyle="mt-0 "
                  labelStyle=""
                />

                <InputText
                  type="password"
                  name="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                />
              </div>

              <div className="text-right text-primary">
                <Link href="/forgot-password">
                  <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Forgot Password?
                  </span>
                </Link>
              </div>

              <button
                type="submit"
                className={
                  "btn mt-2 w-full btn-primary" + (false ? " loading" : "")
                }
              >
                Login
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export default Login;
