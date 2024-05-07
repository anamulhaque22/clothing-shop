import Image from "next/image";

import Link from "next/link";
import InputText from "../Input/InputText";
import LoginWithSocial from "./LoginWithSocial";
import PasswordInput from "./PasswordInput";

export default function Register() {
  return (
    <div className="relative">
      <div className="container">
        <div className="flex justify-center md:justify-start md:flex-row-reverse">
          <div className="absolute w-2/5 left-0 top-0 hidden md:block">
            <Image
              src={"/images/sign-up-bg.png"}
              width={599}
              height={500}
              alt="sign up"
              className="w-full h-[calc(100vh_-_95px)] object-fill"
            />
          </div>
          <div className="basis-full sm:basis-4/5 md:basis-3/5 md:pl-16 mt-11">
            <h3 className="font-core-sans-bold font-bold text-2xl md:text-4xl mb-6 md:mb-12">
              Sign Up
            </h3>
            <LoginWithSocial />

            <form className="flex flex-col gap-y-5 md:gap-y-7">
              <InputText
                type="email"
                containerStyle="mt-0 "
                labelTitle="User name or email address"
              />

              <PasswordInput />
              <div className="flex flex-row-reverse">
                <Link
                  href="forget-password"
                  className="underline text-base font-causten-regular"
                >
                  Forget your password
                </Link>
              </div>

              <div>
                <div className="flex gap-x-2 items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-md"
                  />
                  <p className="font-causten-medium font-medium text-lg text-secondary-light">
                    Agree to our Terms of use and Privacy Policy
                  </p>
                </div>
                <div className="flex gap-x-2 items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-md"
                  />
                  <p className="font-causten-medium font-medium text-lg text-secondary-light">
                    Subscribe to our monthly newsletter
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="bg-primary border border-primary font-causten-medium text-lg rounded-lg px-12 py-3 text-white"
              >
                Sign In
              </button>
              <p className="text-base font-causten-regular mt-3">
                Don{"'"}t have an account?{" "}
                <Link href="register" className="underline">
                  Sing up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
