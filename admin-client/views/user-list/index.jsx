"use client";
import moment from "moment";
import Image from "next/image";

export default function UserListView() {
  return (
    <>
      <div className="flex justify-end gap-x-4">
        <button className="btn btn-primary mt-4 !text-text" type="submit">
          Filter
        </button>

        <button className="btn btn-primary mt-4 !text-text" type="submit">
          Add User
        </button>
      </div>
      <div className="overflow-x-auto w-full text-text">
        <table className="table w-full ">
          <thead>
            <tr className="text-text border-bc">
              <th>User ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Joining Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr key="" className="hover:bg-[#8b33fd21] !border-bc">
              <td>1</td>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="w-12 h-12">
                      <Image
                        src={"/images/2.jpg"}
                        width={250}
                        height={250}
                        alt="product image"
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">First name: </div>
                    <div className="text-sm text-gray-500">Last name: </div>
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
