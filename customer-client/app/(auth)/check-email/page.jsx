import Image from "next/image";
import Link from "next/link";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export default function CheckEmailPage() {
  return (
    <div className="relative">
      <div className="container">
        <div className="flex justify-center md:justify-start md:flex-row-reverse">
          <div className="absolute w-2/5 left-0 top-0 hidden md:block">
            <Image
              src={"/images/check-email-page-bg.png"}
              width={599}
              height={500}
              alt="sign up"
              className="w-full h-[calc(100vh_-_95px)] object-fill"
            />
          </div>
          <div className="basis-full sm:basis-4/5 md:basis-3/5 md:pl-16 mt-11">
            <div className="mb-6 md:mb-8">
              <h3 className="font-core-sans-bold font-bold text-2xl md:text-4xl mb-2">
                Check Email
              </h3>

              <p className="font-causten-medium font-medium text-base text-[rgba(102_,102_,102_,0.8)]">
                Please check your email inbox and click on the provided link to
                reset your password . If you don’t receive email,{" "}
                <span className="text-primary font-bold">
                  Click here to resend
                </span>
              </p>
            </div>

            <p className="text-base font-causten-regular mt-3 flex items-center">
              <MdOutlineKeyboardArrowLeft color="#3C4242" size={"20"} />
              <span>
                Back to{" "}
                <Link href="/login" className="underline">
                  Log in
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
