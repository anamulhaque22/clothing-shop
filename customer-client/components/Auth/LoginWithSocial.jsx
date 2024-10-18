import Image from "next/image";

export default function LoginWithSocial() {
  return (
    <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row md:gap-x-4">
      <button className="flex gap-x-3 text-primary text-lg md:text-[1.2rem] font-medium justify-center py-2 rounded-md items-center border-2 border-secondary w-full">
        <Image
          src={"/images/icon/Google.png"}
          width={20}
          height={20}
          alt="google icon"
        />
        Continue with Google
      </button>
      <button className="flex gap-x-3 text-primary text-lg md:text-[1.2rem] font-medium justify-center py-2 rounded-md items-center border-2 border-secondary w-full">
        <Image
          src={"/images/icon/twitter.png"}
          width={20}
          height={20}
          alt="twitter icon"
        />
        Continue with Twitter
      </button>
    </div>
  );
}
