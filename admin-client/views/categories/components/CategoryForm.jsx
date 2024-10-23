"use client";
import InputText from "@/components/Input/InputText";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().email().required("Email is required"),
});

export default function CategoryForm() {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
    },
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    // const { data, status } = await fetchAuthLogin(formData);
    // if (status === HTTP_CODES.UNPROCESSABLE_ENTITY) {
    //   Object.keys(data.errors).forEach((key) => {
    //     setError(key, {
    //       type: "manual",
    //       message: data.errors[key],
    //     });
    //   });
    //   return;
    // }
    // if (status === HTTP_CODES.OK) {
    //   setTokensInfo({
    //     token: data.token,
    //     refreshToken: data.refreshToken,
    //     tokenExpires: data.tokenExpires,
    //   });
    //   setUser(data.user);
    // }
  });
  return (
    <FormProvider {...methods}>
      <form action="" className="w-full">
        <InputText
          type="text"
          name="name"
          placeholder={"Type here"}
          labelTitle="Name"
          containerStyle="mt-0 "
          labelStyle=""
        />
        <div className="form-control w-full">
          <label
            htmlFor="userName"
            className={`label font-causten-semi-bold text-base text-text`}
          >
            Parent Category
          </label>
          <select className="select select-bordered w-full focus:outline-none bg-secondary focus:bg-white dark:focus:bg-secondary">
            <option disabled selected>
              All Category
            </option>
            <option>Small Apple</option>
            <option>Small Orange</option>
            <option>Small Tomato</option>
          </select>
        </div>

        <div className="form-control w-full">
          <label
            htmlFor="userName"
            className={`label font-causten-semi-bold text-base text-text`}
          >
            Show in Menu
          </label>
          <select className="select select-bordered w-full focus:outline-none bg-secondary focus:bg-white dark:focus:bg-secondary">
            <option disabled selected>
              Show in Menu
            </option>
            <option>YES</option>
            <option>NO</option>
          </select>
        </div>

        <div className="flex justify-start">
          <button className="btn btn-primary mt-4 !text-text" type="submit">
            Add Product
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
