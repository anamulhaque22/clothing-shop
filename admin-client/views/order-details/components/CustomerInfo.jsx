import Link from "next/link";
import { FaUser } from "react-icons/fa6";

export default function CustomerInfo() {
  return (
    <div className="flex gap-x-2">
      <div className="h-12 w-12 bg-[#646fe465] flex justify-center items-center rounded-full">
        <FaUser className="text-xl text-[#646EE4]" />
      </div>
      <div className="text-text space-y-1">
        <h4 className="font-semibold">Customer</h4>
        <p className="font-normal">Anamul Haque</p>
        <p className="font-normal">anaml.ah00@gmail.com</p>
        <p className="font-normal">+8801946988659</p>
        <Link href={"/users/details/1"} className="font-normal text-[#646EE4]">
          View Profile
        </Link>
      </div>
    </div>
  );
}
