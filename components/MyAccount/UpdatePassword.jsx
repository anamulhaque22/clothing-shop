import React, { useState } from "react";
import InputText from "../Input/InputText";

const UpdatePassword = () => {
  const UPDATE_PASS_OBJ = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  // const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const [updatePassObj, setUpdatePassObj] = useState(UPDATE_PASS_OBJ);

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
    setUpdatePassObj({ ...updatePassObj, [updateType]: value });
  };
  return (
    <div>
      <h3 className="font-causten-bold text-2xl text-[#3C4242] mb-3">
        Account Information
      </h3>
      <form action="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputText
            type="password"
            defaultValue={updatePassObj.oldPassword}
            updateType="oldPassword"
            containerStyle="mt-0"
            labelTitle="Old Password*"
            updateFormValue={updateFormValue}
          />

          <InputText
            type="text"
            defaultValue={updatePassObj.newPassword}
            updateType="newPassword"
            containerStyle="mt-0"
            labelTitle="New Password*"
            updateFormValue={updateFormValue}
          />
          <InputText
            type="text"
            defaultValue={updatePassObj.confirmPassword}
            updateType="confirmPassword"
            containerStyle="mt-0"
            labelTitle="Confirm Password*"
            updateFormValue={updateFormValue}
          />
        </div>
        <div className="flex justify-end mt-5">
          <button className="btn btn-primary">Change</button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
