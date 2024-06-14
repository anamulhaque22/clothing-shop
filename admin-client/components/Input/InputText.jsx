export default function InputText({ label, type }) {
  return (
    <div className="form-control w-full">
      <label htmlFor="name" className="label label-text text-text">
        Product Name
      </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="input  input-bordered w-full h-10 focus:outline-1 focus:outline-offset-1"
      />
    </div>
  );
}
