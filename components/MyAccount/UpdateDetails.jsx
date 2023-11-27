import React, { useState } from "react";
import InputText from "../Input/InputText";
import { Input } from "postcss";
import UpdatePassword from "./UpdatePassword";

const UpdateDetails = () => {
  const INITIAL_USER_OBJ = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  const UPDATE_PASS_OBJ = {
    oldPassword: "",
    newPassword: "",
  };

  // const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);
  const [email, setEmail] = useState("");

  // const submitForm = (e) =>{
  //     e.preventDefault()
  //     setErrorMessage("")

  //     if(userObj.emailId.trim() === "")return setErrorMessage("Email Id is required! (use any value)")
  //     if(userObj.password.trim() === "")return setErrorMessage("Password is required! (use any value)")
  //     else{
  //         setLoading(true)
  //         // Call API to check user credentials and save token in localstorage
  //         localStorage.setItem("token", "DumyTokenHere")
  //         setLoading(false)
  //         window.location.href = '/app/welcome'
  //     }
  // }

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setUserObj({ ...userObj, [updateType]: value });
  };

  const updateEmailInput = (val) => {
    setEmail(val);
    updateFormValue({ updateType: "email", value: val });
  };
  return (
    <div className="custom-shadow mt-6 py-6 px-5 rounded-lg">
      <form action="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputText
            type="text"
            defaultValue={userObj.firstName}
            updateType="firstName"
            containerStyle="mt-0"
            labelTitle="First Name*"
            updateFormValue={updateFormValue}
          />
          <InputText
            type="text"
            defaultValue={userObj.lastName}
            updateType="lastName"
            containerStyle="mt-0"
            labelTitle="Last Name*"
            updateFormValue={updateFormValue}
          />
          <div className="form-control w-full">
            <label className="label">
              <span
                className={"font-causten-semi-bold text-base text-[#3C4242] "}
              >
                Email <span className="text-red-600">(Not Changeable)</span>
              </span>
            </label>
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => updateEmailInput(e.target.value)}
              className="input  input-bordered w-full focus:outline-none "
            />
          </div>
          <InputText
            type="text"
            defaultValue={userObj.phone}
            updateType="phone"
            containerStyle="mt-0"
            labelTitle="Phone*"
            updateFormValue={updateFormValue}
          />
        </div>
        <div className="flex justify-end mt-5">
          <button className="btn btn-primary">Update</button>
        </div>
      </form>

      <UpdatePassword />
      <form action=""></form>
    </div>
  );
};

export default UpdateDetails;
