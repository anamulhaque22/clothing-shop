import PasswordInput from "@/components/Auth/PasswordInput";
import Image from "next/image";

export default async function CreateNewPasswordPage() {
  const submitForm = async (formData) => {
    "use server";
    console.log(formData);
  };
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

          <form
            className="flex flex-col gap-y-5 md:gap-y-7"
            action={submitForm}
          >
            <PasswordInput />
            <div>
              <PasswordInput labelText={"Confirm Password"} />
              <p className="text-[#EE1D52] font-causten-regular text-base font-normal mt-1">
                New password and comfirm new password do not match
              </p>
            </div>
            <div>
              <button
                type="submit"
                className="bg-primary border border-primary font-causten-medium text-lg rounded-lg px-12 py-3 text-white"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
