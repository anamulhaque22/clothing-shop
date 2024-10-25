import Image from "next/image";

export default function OrderdProducts() {
  return (
    <div className="overflow-x-auto w-full text-text">
      <table className="table w-full ">
        <thead>
          <tr className="text-text bg-[#F7F8F9] dark:bg-[#32394E] border-none">
            <th>Product</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr key="" className="border-none">
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="w-12 h-12">
                    <Image
                      src={"/images/2.jpg"}
                      width={250}
                      height={250}
                      alt="product image"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">first name</div>
                </div>
              </div>
            </td>
            <td>$44.24</td>
            <td>2</td>
            <td className="text-right">$99.5</td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-end mt-4 text-sm">
        <div className="w-80 max-w-lg px-4 space-y-[5px]">
          <div className="flex flex-row justify-between">
            <p>Subtotal:</p>
            <p>$973</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Shippint Cost:</p>
            <p>$973</p>
          </div>

          <div className="flex flex-row justify-between items-center">
            <p>Grand total</p>

            <p className="text-xl">
              <b>$973</b>
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Status</p>

            <button className="btn btn-xs bg-[#ccf0d1] border-[#ccf0d1] hover:bg-[#ccf0d1] text-[#00B517] rounded-full">
              Success
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
