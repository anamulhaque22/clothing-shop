import Image from "next/image";
import Link from "next/link";
import React from "react";

const PersonalDetails = () => {
  return (
    <div className="flex justify-between custom-shadow mt-6 py-6 px-5 rounded-lg">
      <div className="w-3/5">
        <h3 className="font-causten-bold text-2xl text-[#3C4242] mb-3">
          Personal Details
        </h3>
        <div className="flex justify-between gap-5">
          <div>
            <p className="text-base font-causten-bold">
              First Name{" "}
              <span className="font-causten-regular ml-2">Anamul</span>
            </p>
            <p className="text-base font-causten-bold">
              Last Name{" "}
              <span className="font-causten-regular ml-2">Anamul</span>
            </p>
          </div>
          <div>
            <p className="text-base font-causten-bold">
              Phone{" "}
              <span className="font-causten-regular ml-2">+8801946988659</span>
            </p>
            <p className="text-base font-causten-bold">
              Email{" "}
              <span className="font-causten-regular ml-2">
                anamul.ah00@gmail.com
              </span>
            </p>
          </div>
        </div>
      </div>
      <Link href={"/edit-profile"} className="btn">
        Edit Profile
        <Image
          src={"/images/icon/edit.png"}
          width={18}
          height={18}
          alt="edit icon"
          className="text-white"
        />
      </Link>
    </div>
  );
};

export default PersonalDetails;
