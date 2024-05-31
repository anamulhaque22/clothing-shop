import InputText from "@/components/Input/InputText";
import Image from "next/image";
import Link from "next/link";

export default function ResetPasswordPage() {
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

            <form className="flex flex-col gap-y-5 md:gap-y-7 mt-7">
              <div>
                <InputText
                  type="email"
                  containerStyle="mt-0 "
                  labelTitle="Email"
                />
                <p className="text-[#EE1D52] font-causten-regular text-base font-normal mt-1">
                  We can not find your email.
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-primary border border-primary font-causten-medium text-lg rounded-lg px-12 py-3 text-white"
                >
                  Send
                </button>
                <p className="text-base font-causten-regular mt-3">
                  Back to
                  <Link href="/login" className="underline">
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
