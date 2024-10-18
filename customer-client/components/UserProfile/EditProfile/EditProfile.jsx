"use client";
import HTTP_CODES from "@/services/api/constants/http-codes";
import { useAuthPatchMeService } from "@/services/api/services/auth";
import useAuth from "@/services/auth/use-auth";
import useAuthActions from "@/services/auth/use-auth-actions";
import { yupResolver } from "@hookform/resolvers/yup";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import InputText from "../../Input/InputText";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  // phone: yup.string().required("Phone is required"),
});
const EditProfile = () => {
  const { setUser } = useAuthActions();
  const { user } = useAuth();
  const fetchAuthPatchMe = useAuthPatchMeService();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      // phone: "",
    },
  });

  const { handleSubmit, setError, reset } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = await fetchAuthPatchMe(formData);

    if (status === HTTP_CODES.UNPROCESSABLE_ENTITY) {
      Object.keys(data.errors).forEach((key) => {
        setError(key, {
          type: "manual",
          message: data.errors[key],
        });
      });
      return;
    }

    console.log({ status, data });

    if (status === HTTP_CODES.OK) {
      setUser(data);
      enqueueSnackbar("Profile has been updated successfully", {
        variant: "success",
      });
    }
  });

  useEffect(() => {
    reset({
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      // phone: user?.phone,
    });
  }, [user, reset]);
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputText
            type="text"
            name="firstName"
            containerStyle="mt-0"
            labelTitle="First Name*"
          />
          <InputText
            type="text"
            name="lastName"
            containerStyle="mt-0"
            labelTitle="Last Name*"
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
              value={user?.email}
              placeholder="Email"
              className="input  input-bordered w-full focus:outline-none"
              disabled
            />
          </div>
          <InputText
            type="text"
            name="phone"
            containerStyle="mt-0"
            labelTitle="Phone*"
          />
        </div>
        <div className="flex justify-end mt-5">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditProfile;
