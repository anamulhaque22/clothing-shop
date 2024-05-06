"use client";
import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export default function PasswordInput() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <div className="form-control w-full">
      <label className="label font-causten-semi-bold text-base text-[#3C4242] flex justify-between items-center w-full">
        <p>Password</p>
        <button
          type="button"
          className="flex gap-x-2 items-center"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? (
            <>
              <BsEyeFill size={18} color="#807D7E" /> <p>Show</p>
            </>
          ) : (
            <>
              <BsEyeSlashFill size={18} color="#807D7E" /> <p>Hide</p>
            </>
          )}
        </button>
      </label>
      <input
        type={isPasswordVisible ? "text" : "password"}
        placeholder=""
        className="input  input-bordered w-full focus:outline-none "
      />
    </div>
  );
}
