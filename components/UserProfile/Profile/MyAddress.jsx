import Image from "next/image";
import Link from "next/link";

const MyAddress = () => {
  return (
    <div className="custom-shadow mt-6 py-6 px-5 rounded-lg">
      <div className="flex justify-between mb-6">
        <h3 className="font-causten-bold text-2xl text-[#3C4242] mb-3">
          My Addresses
        </h3>
        <Link href={"/edit-profile"} className="btn">
          Edit Profile
          <Image
            src={"/images/icon/location.png"}
            width={18}
            height={18}
            alt="edit icon"
            className="text-white"
          />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="rounded-md shadow-md">
          <div className="flex justify-between p-5 bg-[#F5F6F8]">
            <p>Office</p>
            <Image
              src={"/images/icon/Delete.svg"}
              width={18}
              height={18}
              alt="edit icon"
            />
          </div>
          <div className="p-5">
            <p className="text-base font-causten-bold">
              Name <span className="font-causten-regular ml-2">Anamul</span>
            </p>
            <p className="text-base font-causten-bold">
              Phone{" "}
              <span className="font-causten-regular ml-2">01946977549</span>
            </p>
            <p className="text-base font-causten-bold">
              Address{" "}
              <span className="font-causten-regular ml-2">
                Kuril, Dhaka, Bangladesh
              </span>
            </p>
          </div>
        </div>
        <div className="rounded-md shadow-md">
          <div className="flex justify-between p-5 bg-[#F5F6F8]">
            <p>Office</p>
            <Image
              src={"/images/icon/Delete.svg"}
              width={18}
              height={18}
              alt="edit icon"
            />
          </div>
          <div className="p-5">
            <p className="text-base font-causten-bold">
              Name <span className="font-causten-regular ml-2">Anamul</span>
            </p>
            <p className="text-base font-causten-bold">
              Phone{" "}
              <span className="font-causten-regular ml-2">01946977549</span>
            </p>
            <p className="text-base font-causten-bold">
              Address{" "}
              <span className="font-causten-regular ml-2">
                Kuril, Dhaka, Bangladesh
              </span>
            </p>
          </div>
        </div>
        <div className="rounded-md shadow-md">
          <div className="flex justify-between p-5 bg-[#F5F6F8]">
            <p>Office</p>
            <Image
              src={"/images/icon/Delete.svg"}
              width={18}
              height={18}
              alt="edit icon"
            />
          </div>
          <div className="p-5">
            <p className="text-base font-causten-bold">
              Name <span className="font-causten-regular ml-2">Anamul</span>
            </p>
            <p className="text-base font-causten-bold">
              Phone{" "}
              <span className="font-causten-regular ml-2">01946977549</span>
            </p>
            <p className="text-base font-causten-bold">
              Address{" "}
              <span className="font-causten-regular ml-2">
                Kuril, Dhaka, Bangladesh
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAddress;
