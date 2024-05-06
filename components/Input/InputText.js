function InputText({
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  placeholder,
}) {
  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span
          className={
            "font-causten-semi-bold text-base text-[#3C4242] " + labelStyle
          }
        >
          {labelTitle}
        </span>
      </label>
      <input
        type={type || "text"}
        placeholder={placeholder || ""}
        className="input  input-bordered w-full focus:outline-none "
      />
    </div>
  );
}

export default InputText;
