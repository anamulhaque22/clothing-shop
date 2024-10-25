import Link from "next/link";
import { MdLocationOn } from "react-icons/md";
export default function DeliverTo() {
  return (
    <div className="flex gap-x-2">
      <div className="h-12 w-12 bg-[#646fe465] flex justify-center items-center rounded-full">
        <MdLocationOn className="text-xl text-[#646EE4]" />
      </div>
      <div className="text-text space-y-1">
        <h4 className="font-semibold">Deliver to</h4>
        <p className="font-normal">City: Dhaka</p>
        <p className="font-normal">Block A, House 123, Floor 2</p>
        <p className="font-normal">Pro box 1000</p>
        <Link href={"/users/details/1"} className="font-normal text-[#646EE4]">
          View Profile
        </Link>
      </div>
    </div>
  );
}
