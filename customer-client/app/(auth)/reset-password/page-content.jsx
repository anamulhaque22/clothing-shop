"use client";
import InputText from "@/components/Input/InputText";
import HTTP_CODES from "@/services/api/constants/http-codes";
import { useAuthForgotPasswordService } from "@/services/api/services/auth";
import withPageRequiredGuest from "@/services/auth/with-page-required-guest";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});

function ResetPassword() {
  const fetchAuthForgotPassword = useAuthForgotPasswordService();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
    },
  });

  const { handleSubmit, setError, isSubmitting } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = await fetchAuthForgotPassword(formData);

    if (status === HTTP_CODES.UNPROCESSABLE_ENTITY) {
      Object.keys(data.errors).forEach((key) => {
        setError(key, {
          type: "manual",
          message: data.errors[key],
        });
      });
      return;
    }

    if (status === HTTP_CODES.NO_CONTENT) {
      enqueueSnackbar("Reset link has been sent to your email", {
        variant: "success",
      });
    }
  });

  return (
    <div className="relative">
      <div className="container">
        <div className="flex justify-center md:justify-start md:flex-row-reverse">
          <div className="absolute w-2/5 left-0 top-0 hidden md:block">
            <Image
              src={"/images/reset-password-bg.png"}
              width={599}
              height={500}
              alt="sign up"
              className="w-full h-[calc(100vh_-_95px)] object-fill"
            />
          </div>
          <div className="basis-full sm:basis-4/5 md:basis-3/5 md:pl-16 mt-11">
            <div className="mb-6 md:mb-12">
              <h3 className="font-core-sans-bold font-bold text-2xl md:text-4xl mb-2">
                Reset Your Password
              </h3>
              <p className="font-causten-medium font-medium text-base text-[#676B80]">
                Enter your email and we{"'"}ll send you a link to reset your
                password.
              </p>
              <p className="font-causten-medium font-medium text-base text-[rgba(102_,102_,102_,0.8)]">
                Please check it.
              </p>
            </div>
            <FormProvider {...methods}>
              <form
                className="flex flex-col gap-y-5 md:gap-y-7 mt-7"
                onSubmit={onSubmit}
              >
                <div>
                  <InputText
                    type="email"
                    name="email"
                    containerStyle="mt-0 "
                    labelTitle="Email"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary border border-primary font-causten-medium text-lg rounded-lg px-12 py-3 text-white"
                  >
                    Send
                  </button>
                  <p className="text-base font-causten-regular mt-3">
                    Back to{" "}
                    <Link href="/login" className="underline">
                      Log in
                    </Link>
                  </p>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withPageRequiredGuest(ResetPassword);
