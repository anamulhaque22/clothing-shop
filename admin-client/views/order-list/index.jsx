import moment from "moment";
import Image from "next/image";

export default function OrderList() {
  return (
    <>
      <div className="flex justify-between">
        <select className="select select-bordered w-full max-w-xs focus:outline-none bg-secondary focus:bg-white dark:focus:bg-secondary">
          <option disabled selected>
            All Category
          </option>
          <option>Small Apple</option>
          <option>Small Orange</option>
          <option>Small Tomato</option>
        </select>

        <select className="select select-bordered w-full max-w-xs focus:outline-none bg-secondary focus:bg-white dark:focus:bg-secondary">
          <option disabled selected>
            Status
          </option>
          <option>Active</option>
          <option>Hidden</option>
        </select>
      </div>
      <div className="overflow-x-auto w-full text-text">
        <table className="table w-full ">
          <thead>
            <tr className="text-text border-bc">
              <th>Order ID</th>
              <th>Customer</th>
              <th>Order Date</th>
              <th>Payment Status</th>
              <th>Amount</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr key="" className="hover:bg-[#8b33fd21] !border-bc">
              <td>
                <div className="font-bold">first name</div>
              </td>
              <td>email</td>
              <td>{moment(new Date()).format("DD MMM YY")}</td>
              <td>status</td>
              <td>last name</td>
              <td>
                <button className="btn btn-primary !text-text btn-xs">
                  Edit
                </button>
              </td>
              <td>
                <div className="flex flex-row gap-x-1">
                  <button
                    className="btn btn-primary !text-text btn-xs"
                    type="submit"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-primary !text-text btn-xs"
                    type="submit"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>

            <tr key="" className="hover:bg-[#8b33fd21] !border-bc">
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
              <td>email</td>
              <td>{moment(new Date()).format("DD MMM YY")}</td>
              <td>status</td>
              <td>last name</td>
              <td>
                <button className="btn btn-primary !text-text btn-xs">
                  Edit
                </button>
              </td>
              <td>
                <div className="flex flex-row gap-x-1">
                  <button
                    className="btn btn-primary !text-text btn-xs"
                    type="submit"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-primary !text-text btn-xs"
                    type="submit"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
