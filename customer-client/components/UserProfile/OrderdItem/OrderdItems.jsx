import Link from "next/link";

const OrderdItems = () => {
  return (
    <div className="overflow-x-auto rounded-md w-full font-causten-medium custom-shadow py-6 px-5">
      <div></div>
      <table className="table w-full">
        <thead>
          <tr className="text-secondary text-lg">
            <th>Date</th>
            <th>Status</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-base">
          <tr>
            <td>October 16, 2023</td>
            <td>Processing</td>
            <td>$4444.00</td>
            <td>
              <Link
                href={"/order-details"}
                className="bg-primary text-white px-3 py-1 inline-block rounded-md"
              >
                Order Details
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderdItems;
