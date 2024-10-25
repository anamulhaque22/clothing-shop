import Link from "next/link";
import { MdLocalShipping } from "react-icons/md";

export default function OrderInfo() {
  return (
    <div className="flex gap-x-2">
      <div className="h-12 w-12 bg-[#646fe465] flex justify-center items-center rounded-full">
        <MdLocalShipping className="text-xl text-[#646EE4]" />
      </div>
      <div className="text-text space-y-1">
        <h4 className="font-semibold">Order Info</h4>
        <p className="font-normal">Shipping: Fargo express</p>
        <p className="font-normal">Payment method: card</p>
        <p className="font-normal">Status: new</p>
        <Link href={"/users/details/1"} className="font-normal text-[#646EE4]">
          Download Invoice
        </Link>
      </div>
    </div>
  );
}
