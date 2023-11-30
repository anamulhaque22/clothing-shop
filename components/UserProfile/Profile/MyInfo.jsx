"use client";
import AccountSummery from "./AccountSummery";
import PersonalDetails from "./PersonalDetails";
import MyAddress from "./MyAddress";
import UpdateDetails from "../EditProfile/EditProfile";

const MyInfo = () => {
  return (
    <>
      <AccountSummery />
      <PersonalDetails />
      <MyAddress />
    </>
  );
};

export default MyInfo;
