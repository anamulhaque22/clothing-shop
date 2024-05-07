import InputText from "@/components/Input/InputText";
import Image from "next/image";

export default function page() {
  return (
    <div className="relative">
      <div className="container">
        <div className="flex justify-center md:justify-start md:flex-row-reverse">
          <div className="absolute w-2/5 left-0 top-0 hidden md:block">
            <Image
              src={"/images/verification.png"}
              width={599}
              height={500}
              alt="sign up"
              className="w-full h-[calc(100vh_-_95px)] object-fill"
            />
          </div>
          <div className="basis-full sm:basis-4/5 md:basis-3/5 md:pl-16 mt-11">
            <div className="mb-5">
              <h3 className="font-core-sans-bold font-bold text-2xl md:text-4xl mb-2">
                Verification
              </h3>

              <p className="font-causten-medium font-medium text-base text-[rgba(102_,102_,102_,0.8)]">
                Verify your code.
              </p>
            </div>

            <form className="flex flex-col gap-y-5 md:gap-y-4 mt-5">
              <div>
                <InputText
                  type="text"
                  containerStyle="mt-0 "
                  labelTitle="Verification Code"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-primary border border-primary font-causten-medium text-lg rounded-lg px-12 py-3 text-white"
                >
                  Verify Code
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
