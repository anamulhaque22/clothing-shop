"use client";
import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export default function PasswordInput() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <div className="form-control w-full">
      <label className="label font-causten-semi-bold text-base text-[#3C4242] flex justify-between items-center w-full">
        <span>Password</span>
        <button
          type="button"
          className="flex gap-x-2 items-center"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? (
            <>
              <BsEyeFill size={18} color="#807D7E" /> <span>Show</span>
            </>
          ) : (
            <>
              <BsEyeSlashFill size={18} color="#807D7E" /> <span>Hide</span>
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
