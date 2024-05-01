import Image from "next/image";

const AuthLayoutNav = () => {
  return (
    <div className="border-b border-b-[#BEBCBD]">
      <div className="container">
        <div className="container flex justify-between items-center py-5 relative">
          <div>
            <a href="/">
              <Image
                src={"/images/logo.png"}
                height={100}
                width={100}
                alt="logo"
                priority={true}
              />
            </a>
          </div>
          <div className="relative flex items-center">
            <label className="absolute my-auto  left-5">
              <Image
                src={"/images/icon/search.svg"}
                alt="search icon"
                width={20}
                height={20}
              />
            </label>
            <input
              className="bg-off-white-light font-causten-regular text-secondary-light w-full rounded-lg focus:outline-none pl-12 py-3 text-base"
              type="text"
              placeholder="Search"
            />
          </div>

          <div></div>
          <div className="flex gap-x-7">
            <button className="bg-primary border border-primary font-causten-medium text-lg rounded-lg px-12 py-3 text-white">
              Login
            </button>
            <button className="bg-transparent border border-secondary font-causten-medium text-lg rounded-lg px-12 py-3 text-black">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutNav;
