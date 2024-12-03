"use client";
import PasswordInput from "@/components/Auth/PasswordInput";
import HTTP_CODES from "@/services/api/constants/http-codes";
import { useAuthResetPasswordService } from "@/services/api/services/auth";
import withPageRequiredGuest from "@/services/auth/with-page-required-guest";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PiWarningCircle } from "react-icons/pi";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "New password and comfirm new password do not match"
    )
    .required("Confirm password is required"),
});

function ExpiresAlert({ isExpired }) {
  return (
    isExpired && (
      <div className="flex justify-start">
        <div className="bg-[#160B0B] py-2 px-3 rounded flex gap-x-2 items-center">
          <PiWarningCircle className="text-red-500" size={22} />
          <p className="text-[#f4c7c7] text-base">
            The password reset link has expired
          </p>
        </div>
      </div>
    )
  );
}

function NewPassword() {
  const fetchAuthResetPassword = useAuthResetPasswordService();
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  const expires = useMemo(() => {
    const params = new URLSearchParams(window.location.search);

    return Number(params.get("expires"));
  }, []);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setCurrentTime(now);

      if (expires < now) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expires]);

  const onSubmit = handleSubmit(async (formData) => {
    const params = new URLSearchParams(window.location.search);
    const hash = params.get("hash");
    if (!hash) return;

    const { data, status } = await fetchAuthResetPassword({
      password: formData.password,
      hash,
    });

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
      enqueueSnackbar("Password has been reset successfully", {
        variant: "success",
      });

      router.replace("/login");
    }
  });

  const isExpired = expires < currentTime;
  return (
    <div className="relative">
      <div className="absolute w-2/5 left-0 top-0 hidden md:block">
        <Image
          src={"/images/create-new-password-bg.png"}
          width={599}
          height={500}
          alt="sign up"
          className="w-full h-[calc(100vh_-_95px)] object-fill"
        />
      </div>

      <div className="container flex justify-center md:justify-start md:flex-row-reverse">
        <div className="basis-full sm:basis-4/5 md:basis-3/5 md:pl-16 mt-11">
          <div className="mb-5">
            <h3 className="font-core-sans-bold font-bold text-2xl md:text-4xl mb-2">
              Create New Password
            </h3>

            <p className="font-causten-medium font-medium text-base text-[rgba(102_,102_,102_,0.8)]">
              Your new password must be different from previous used passwords.
            </p>
          </div>

          <ExpiresAlert isExpired={isExpired} />

          <FormProvider {...methods}>
            <form
              className="flex flex-col gap-y-5 md:gap-y-7"
              onSubmit={onSubmit}
            >
              <PasswordInput />
              <PasswordInput
                labelText={"Confirm Password"}
                name="confirmPassword"
              />

              <div>
                <button
                  type="submit"
                  className="bg-primary border border-primary font-causten-medium text-lg rounded-lg px-12 py-3 text-white disabled:bg-slate-600 disabled:border-slate-600"
                  disabled={isSubmitting || isExpired}
                >
                  Reset Password
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export default withPageRequiredGuest(NewPassword);
