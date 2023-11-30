import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserProfileNav = () => {
  return (
    <ul className="user-account menu p-0">
      <li>
        <Link
          href={"/my-profile"}
          className="bg-[#F6F6F6] hover:bg-[#F6F6F6] font-causten-semi-bold text-[#807D7E] hover:text-[#807D7E] text-lg"
        >
          <Image
            src={"/images/icon/user.svg"}
            width={0}
            height={0}
            alt="image"
            className="w-[20px] h-[20px] mr-2"
          />
          My Profile
        </Link>
      </li>
      <li>
        <Link
          href={"/orders"}
          className=" hover:bg-[#F6F6F6] font-causten-semi-bold text-[#807D7E] hover:text-[#807D7E] text-lg hover:rounded-r-md hover:rounded-l-none"
        >
          <Image
            src={"/images/icon/myorders.svg"}
            width={0}
            height={0}
            alt="image"
            className="w-[20px] h-[20px] mr-2"
          />
          Orders
        </Link>
      </li>
      <li>
        <Link
          href={"/wish-list"}
          className=" hover:bg-[#F6F6F6] font-causten-semi-bold text-[#807D7E] hover:text-[#807D7E] text-lg hover:rounded-r-md hover:rounded-l-none"
        >
          <Image
            src={"/images/icon/heart.svg"}
            width={0}
            height={0}
            alt="image"
            className="w-[20px] h-[20px] mr-2"
          />
          Wish List
        </Link>
      </li>
      <li>
        <Link
          href={"/"}
          className=" hover:bg-[#F6F6F6] font-causten-semi-bold text-[#807D7E] hover:text-[#807D7E] text-lg hover:rounded-r-md hover:rounded-l-none"
        >
          <Image
            src={"/images/icon/signout.svg"}
            width={0}
            height={0}
            alt="image"
            className="w-[20px] h-[20px] mr-2"
          />
          Sign Out
        </Link>
      </li>
    </ul>
  );
};

export default UserProfileNav;
