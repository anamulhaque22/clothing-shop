"use client";

import withPageRequiredAuth from "@/services/auth/page-with-required-auth";
import EditUserForm from "./components/EditUserForm";
import UserPasswordChangeForm from "./components/UserPasswordChangeForm";

function EditUser() {
  return (
    <>
      <EditUserForm />
      <UserPasswordChangeForm />
    </>
  );
}

export default withPageRequiredAuth(EditUser);
