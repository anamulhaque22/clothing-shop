import moment from "moment";

export default function CategoryList() {
  return (
    <div className="overflow-x-auto w-full text-text">
      <table className="table w-full ">
        <thead>
          <tr className="text-text border-bc">
            <th>ID</th>
            <th>Category Name</th>
            <th>Show In Munu</th>
            <th>Parent Category</th>
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
  );
}
