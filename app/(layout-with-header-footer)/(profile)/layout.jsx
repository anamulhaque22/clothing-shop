"use client";
import UserProfileNav from "@/components/Navbar/UserProfileNav";
import Image from "next/image";

const UserProfileLayout = ({ children }) => {
  return (
    <div className="container">
      <div className="drawer lg:drawer-open my-5 gap-x-5">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-2"
            className="rounded border border-black p-1 mb-3 inline-block lg:hidden"
          >
            <Image
              src={"/images/icon/menu-arrow.svg"}
              width={24}
              height={24}
              alt="filter icon"
            />
          </label>
          {/* <!-- Page content here --> */}
          {children}
        </div>
        <div className="drawer-side lg:rounded-md lg:custom-shadow lg:h-auto">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="bg-white w-80 min-h-full  p-4">
            <div className="flex gap-4 items-center mb-5">
              <div className="avatar">
                <div className="w-20 rounded-full bg-slate-200">
                  <Image
                    src="/images/icon/user-icon.png"
                    width={80}
                    height={80}
                    className="w-80"
                    alt="user profile"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-causten-bold text-lg text-[#3C4242]">
                  Anamul Haque
                </h4>
                <p className="font-causten-medium text-base">
                  Joined Nov 29th 23
                </p>
              </div>
            </div>
            <UserProfileNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileLayout;
