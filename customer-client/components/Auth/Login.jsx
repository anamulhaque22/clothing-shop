import Image from "next/image";

import Link from "next/link";
import InputText from "../Input/InputText";
import LoginWithSocial from "./LoginWithSocial";
import PasswordInput from "./PasswordInput";

export default async function Login() {
  const submitForm = async (formData) => {
    "use server";
    console.log(formData);
  };
  return (
    <div className="relative">
      <div className="absolute w-2/5 left-0 top-0 hidden md:block">
        <Image
          src={"/images/sign-in.png"}
          width={599}
          height={500}
          alt="sign up"
          className="w-full h-[calc(100vh_-_95px)] object-fill"
        />
      </div>

      <div className="container flex justify-center md:justify-start md:flex-row-reverse">
        <div className="basis-full sm:basis-4/5 md:basis-3/5 md:pl-16 mt-11">
          <h3 className="font-core-sans-bold font-bold text-2xl md:text-4xl mb-6 md:mb-12">
            Sign In Page
          </h3>
          <LoginWithSocial />

          <div className="divider font-core-sans-medium text-lg text-[#666666] mt-7 mb-6 md:my-10">
            OR
          </div>

          <form
            className="flex flex-col gap-y-5 md:gap-y-7"
            action={submitForm}
          >
            <InputText
              type="text"
              containerStyle="mt-0 "
              labelTitle="User name or email address"
              labelStyle=""
              placeholder={""}
            />

            <div>
              <PasswordInput />
              <div className="flex flex-row-reverse">
                <Link
                  href="/forget-password"
                  className="underline text-base font-causten-regular"
                >
                  Forget your password
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-primary border border-primary font-causten-medium text-lg rounded-lg px-12 py-3 text-white"
              >
                Sign In
              </button>

              <div className="text-base font-causten-regular mt-3 flex">
                <p>Don{"'"}t have an account?</p>
                <Link href="/register" className="underline">
                  Sing up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
