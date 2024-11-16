import { MdLocalShipping } from "react-icons/md";

export default function ShippingInfo({ address }) {
  return (
    <div className="flex gap-x-2 bg-content-bg rounded-xl border border-bc p-4">
      <div className="h-12 w-12 bg-[#224A3A] flex justify-center items-center rounded-full">
        <MdLocalShipping className="text-xl text-[#00B517]" />
      </div>
      <div className="text-text space-y-1">
        <h4 className="font-semibold">Billing Info</h4>
        <p className="font-normal">
          {address?.firstName} {address?.lastName}
        </p>
        <p className="font-normal">City: {address?.city}</p>
        <p className="font-normal">
          {address?.aptSuiteUnit}, {address?.streetAddress}
        </p>
        <p className="font-normal">{address?.phone}</p>
      </div>
    </div>
  );
}
