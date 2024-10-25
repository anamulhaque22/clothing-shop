import Image from "next/image";

export default function BestSellingProduct() {
  return (
    <div className="bg-content-bg px-5 py-3 rounded-xl border border-bc">
      <div className="flex justify-between items-center text-text py-3">
        <h3>Best Selling Product</h3>
        <div className="flex items-center gap-x-2">
          <p className="">Short By</p>
          <select className=" select select-sm select-bordered focus:outline-none bg-secondary focus:bg-white dark:focus:bg-secondary">
            <option disabled selected>
              Status
            </option>
            <option>Active</option>
            <option>Hidden</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto w-full text-text">
        <table className="table w-full ">
          <thead>
            <tr className="text-text bg-[#F7F8F9] dark:bg-[#32394E] border-none">
              <th>Product</th>
              <th>Price</th>
              <th>Orders</th>
              <th>Stock</th>
              <th className="text-right">Abount</th>
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
      </div>
    </div>
  );
}
