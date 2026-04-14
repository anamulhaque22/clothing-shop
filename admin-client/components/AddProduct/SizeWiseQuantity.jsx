"use client";
export default function SizeWiseQuantity({
  info,
  onHandleSizeWiseQuantity,
  sizes,
}) {
  return (
    <div className="mt-5">
      <label htmlFor="size-wise-quantity" className="text-sm">
        Size Wise Quantity:
      </label>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {sizes?.map((s, i) => {
          return (
            <div className="flex items-center justify-between gap-x-3" key={i}>
              <label
                htmlFor={`size-wise-quantity-${s?.name}`}
                className="text-sm"
              >
                {s?.name}:{" "}
              </label>
              <div className="flex gap-2 items-center">
                <input
                  name="colorSizeWiseQuantity"
                  type="number"
                  min={0}
                  step={1}
                  id={`size-wise-quantity-${s?.name}`}
                  className="w-16 text-sm bg-secondary input input-bordered h-7 focus:outline-1 focus:outline-offset-1"
                  onChange={(e) => onHandleSizeWiseQuantity(e, s)}
                  value={info.colorSizeWiseQuantity[s?.name.toLowerCase()] || 0}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
