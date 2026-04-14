"use client";
import { ProductVisibility } from "@/constants";
import useToast from "@/hooks/useToast";
import {
  useCreateProductService,
  useUploadProductImagesService,
} from "@/services/api/services/product";
import HTTP_CODES from "@/services/api/types/http-codes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import InputError from "../Input/InputError";
import InputText from "../Input/InputText";
import CategoryInput from "./CategoryInput";
import ColorPickerFromImage from "./ColorPickerFromImage";
import RichTextEditor from "./RichTextEditor";
import SizesInput from "./SizesInput";
import TagsInput from "./TagsInput";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  buyPrice: yup.number().required("Buy Price is required"),
  sellPrice: yup.number().required("Sell Price is required"),
  category: yup.object().shape({
    id: yup.string().required("Category is required"),
  }),
  tags: yup.array().of(yup.string()),
  quantity: yup.number().required("Quantity is required"),
  discount: yup.number().required("Discount is required"),
  sizes: yup.array().min(1, "Please select at least one size"),
  visibility: yup.string().required("Visibility is required"),
  productInfo: yup
    .array()
    .min(1, "Please upload one image")
    .of(
      yup.object().shape({
        color: yup.string().required("Click on image to pick color"),
        colorWiseQuantity: yup
          .number()
          .required("Color Wise Quantity is required"),
        colorSizeWiseQuantity: yup
          .object()
          .test(
            "sizes-exist",
            "All sizes must exist in colorSizeWiseQuantity",
            (value, context) => {
              const sizes = context.parent.sizes || [];
              if (!value || typeof value !== "object") return false;
              return sizes.every((size) => Object.keys(value).includes(size));
            },
          ),
        colorName: yup.string().required("Color Name is required"),
        image: yup.mixed().required("Image is required"),
      }),
    ),
});

const AddProductForm = () => {
  const router = useRouter();
  const fetchUploadImages = useUploadProductImagesService();
  const fetchCreateProduct = useCreateProductService();
  const showToast = useToast();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      buyPrice: null,
      sellPrice: null,
      category: null,
      tags: [],
      quantity: null,
      discount: null,
      sizes: [], //array of sizes. [{id: 1, name: xs}]
      visibility: ProductVisibility.HIDDEN,
      productInfo: [],
    },
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    watch,
    formState: { isSubmitting },
  } = methods;

  const watchedProductInfo = watch("productInfo");
  const productInfo = useMemo(
    () => watchedProductInfo || [],
    [watchedProductInfo],
  );
  const quantity = watch("quantity");
  const sizes = watch("sizes");

  const totalColorWiseQuantity = useMemo(() => {
    return productInfo.reduce(
      (total, info) => total + Number(info?.colorWiseQuantity || 0),
      0,
    );
  }, [productInfo]);

  const totalAssignedSizeWiseQuantity = useMemo(() => {
    return productInfo.reduce((total, info) => {
      const colorAssigned = Object.values(
        info?.colorSizeWiseQuantity || {},
      ).reduce((sum, qty) => sum + Number(qty || 0), 0);

      return total + colorAssigned;
    }, 0);
  }, [productInfo]);

  const hasOverAssignedQuantity = useMemo(() => {
    return productInfo.some((info) => {
      const assigned = Object.values(info?.colorSizeWiseQuantity || {}).reduce(
        (sum, qty) => sum + Number(qty || 0),
        0,
      );
      return assigned > Number(info?.colorWiseQuantity || 0);
    });
  }, [productInfo]);

  useEffect(() => {
    if (Number(quantity || 0) !== totalColorWiseQuantity) {
      setValue("quantity", totalColorWiseQuantity, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [quantity, setValue, totalColorWiseQuantity]);

  const onSubmit = handleSubmit(async (formData) => {
    const expectedQuantity = formData.productInfo.reduce(
      (total, info) => total + Number(info?.colorWiseQuantity || 0),
      0,
    );

    if (Number(formData.quantity || 0) !== expectedQuantity) {
      showToast(
        "Quantity must match the total of all color-wise quantities",
        "error",
      );
      setValue("quantity", expectedQuantity, { shouldValidate: true });
      return;
    }

    const requiredSizeKeys = (formData.sizes || []).map((size) =>
      String(size?.name || "").toLowerCase(),
    );

    const hasMissingSizeAssignment = formData.productInfo.some((info) => {
      const sizeMapKeys = Object.keys(info?.colorSizeWiseQuantity || {}).map(
        (key) => String(key).toLowerCase(),
      );
      return requiredSizeKeys.some((sizeKey) => !sizeMapKeys.includes(sizeKey));
    });

    if (hasMissingSizeAssignment) {
      showToast("Each color must include all selected sizes", "error");
      return;
    }

    const colorNameSet = new Set();
    const hasDuplicateColorName = formData.productInfo.some((info) => {
      const normalized = String(info?.colorName || "")
        .trim()
        .toLowerCase();
      if (!normalized) return false;
      if (colorNameSet.has(normalized)) return true;
      colorNameSet.add(normalized);
      return false;
    });

    if (hasDuplicateColorName) {
      showToast("Duplicate color names are not allowed", "error");
      return;
    }

    // validate quantity and size wise quantity
    const invalidProductInfo = formData.productInfo.find((info) => {
      const sizeWiseQuantity = Object.values(info.colorSizeWiseQuantity);
      const totalSizeWiseQuantity = sizeWiseQuantity.reduce(
        (acc, qty) => acc + Number(qty || 0),
        0,
      );
      return Number(info.colorWiseQuantity || 0) < totalSizeWiseQuantity;
    });

    if (invalidProductInfo) {
      showToast(
        "Color wise quantity must be greater than or equal to total size wise quantity",
        "error",
      );
      return;
    }

    const productImages = formData.productInfo.map((info) => info.image);

    const imageData = new FormData();
    productImages.forEach((img) => {
      imageData.append("images", img);
    });

    // upload images

    const { status, data: imageResData } = await fetchUploadImages(imageData);
    if (status !== HTTP_CODES.OK) {
      showToast("Failed to upload images", "error");
      return;
    }

    // create product
    const productData = {
      ...formData,
      buyPrice: Number(formData.buyPrice || 0),
      sellPrice: Number(formData.sellPrice || 0),
      quantity: Number(expectedQuantity),
      discount: Number(formData.discount || 0),
      images: imageResData.map((img) => ({ id: img.id })),
      sizes: formData.sizes.map((s) => ({
        id: s.id,
      })),
      category: {
        id: Number(formData.category.id),
      },
      productInfo: formData.productInfo.map((info) => ({
        colorCode: info.color,
        colorWiseQuantity: Number(info.colorWiseQuantity || 0),
        colorSizeWiseQuantity: Object.fromEntries(
          Object.entries(info.colorSizeWiseQuantity || {}).map(
            ([key, value]) => [key, Number(value || 0)],
          ),
        ),
        colorName: info.colorName,
      })),
    };

    const { status: createStatus } = await fetchCreateProduct(productData);
    if (createStatus !== HTTP_CODES.CREATED) {
      showToast("Failed to create product", "error");
      return;
    }

    showToast("Product created successfully", "success");
    reset();
    router.push("/products");
  });

  return (
    <div className="relative pt-8 px-6">
      <div className="bg-content-bg px-5 py-3 rounded-xl border border-bc">
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <div className="rounded-lg border border-bc bg-secondary px-4 py-3 mb-4">
              <p className="text-sm font-medium text-text">
                Quick Product Setup
              </p>
              <p className="text-xs text-text opacity-70 mt-1">
                Add sizes first, then upload images and fill each color
                inventory. Total quantity is auto-calculated.
              </p>
            </div>

            <div className="form-control w-full">
              <InputText
                name="title"
                type="text"
                containerStyle="mt-0"
                labelTitle="Product Title"
                placeholder="Product Title"
                inputStyle="h-10"
              />
            </div>

            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  label="Product Description"
                />
              )}
            />

            <div className="mt-4 flex items-center gap-x-7">
              <div className="form-control basis-1/2">
                <InputText
                  name="buyPrice"
                  type="number"
                  containerStyle="mt-0"
                  labelTitle="Buy Price"
                  placeholder="$ 0.00"
                  inputStyle="h-10"
                />
              </div>
              <div className="form-control basis-1/2">
                <InputText
                  name="sellPrice"
                  type="number"
                  containerStyle="mt-0"
                  labelTitle="Sell Price"
                  placeholder="$ 0.00"
                  inputStyle="h-10"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-x-7">
              <div className="basis-1/2">
                <InputText
                  name="discount"
                  type="number"
                  containerStyle="mt-0"
                  labelTitle="Discounts"
                  placeholder="0 %"
                  inputStyle="h-10"
                />
              </div>
              {/* quantity  */}
              <div className="form-control basis-1/2">
                <Controller
                  name="quantity"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor="quantity"
                        className="label font-causten-semi-bold text-base text-text"
                      >
                        Quantity (Auto)
                      </label>
                      <input
                        {...field}
                        value={field.value ?? 0}
                        id="quantity"
                        type="number"
                        readOnly
                        className="input text-text input-bordered w-full h-10 focus:outline-none bg-secondary"
                      />
                      <InputError>
                        {fieldState.error ? fieldState.error.message : ""}
                      </InputError>
                    </>
                  )}
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border border-bc bg-secondary p-3">
                <p className="text-xs text-text opacity-70">
                  Total Product Quantity
                </p>
                <p className="text-xl font-semibold text-text">
                  {Number(quantity || 0)}
                </p>
              </div>
              <div className="rounded-lg border border-bc bg-secondary p-3">
                <p className="text-xs text-text opacity-70">
                  Total Color-wise Quantity
                </p>
                <p className="text-xl font-semibold text-text">
                  {totalColorWiseQuantity}
                </p>
              </div>
              <div className="rounded-lg border border-bc bg-secondary p-3">
                <p className="text-xs text-text opacity-70">
                  Total Size-wise Assigned
                </p>
                <p className="text-xl font-semibold text-text">
                  {totalAssignedSizeWiseQuantity}
                </p>
              </div>
            </div>

            {(hasOverAssignedQuantity ||
              totalAssignedSizeWiseQuantity > Number(quantity || 0)) && (
              <div className="mt-3 rounded-lg border border-red-400 bg-red-50 px-3 py-2 text-xs text-red-700">
                Assigned size quantities are higher than available color
                quantity for at least one image.
              </div>
            )}

            {/* size and category */}
            <div className="mt-4 grid grid-cols-2 it gap-x-7">
              <Controller
                name="sizes"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col">
                    <SizesInput
                      {...field}
                      setValue={setValue}
                      getValues={getValues}
                    />
                    <InputError>
                      {fieldState.error ? fieldState.error.message : ""}
                    </InputError>
                  </div>
                )}
              />
              {/* <SizesInput sizes={sizes} handleSelectSize={handleSelectSize} /> */}
              <Controller
                name="category"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col w-full">
                    <CategoryInput
                      {...field}
                      setValue={setValue}
                      getValues={getValues}
                    />

                    <InputError>
                      {fieldState.error ? fieldState.error.message : ""}
                    </InputError>
                  </div>
                )}
              />
            </div>

            {/* Visivility and tags inputs */}
            <div className="mt-4 grid grid-cols-2 gap-x-7">
              <div className="basis-1/2 flex flex-col">
                <label htmlFor="price" className="label label-text text-text">
                  Visibility:
                </label>
                <Controller
                  name="visibility"
                  control={methods.control}
                  defaultValue={ProductVisibility.HIDDEN}
                  render={({ field }) => (
                    <select
                      className="text-text input-bordered border bg-secondary h-10 px-4 pr-8 rounded leading-tight focus:outline-1 focus:outline-offset-1 focus:bg-white dark:focus:bg-secondary"
                      {...field}
                      id="visibility"
                    >
                      {Object.entries(ProductVisibility).map(([key, value]) => (
                        <option key={key} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
              <Controller
                name="tags"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col w-full">
                    <TagsInput
                      tags={field.value}
                      onSetTags={(updatedTags) => field.onChange(updatedTags)}
                    />

                    <InputError>
                      {fieldState.error ? fieldState.error.message : ""}
                    </InputError>
                  </div>
                )}
              />
              {/* <TagsInput tags={tags} onSetTags={setTags} /> */}
            </div>

            <div className="mt-4">
              <Controller
                control={control}
                name="productInfo"
                render={({ field, fieldState }) => {
                  return (
                    <>
                      <ColorPickerFromImage
                        {...field}
                        productInfo={getValues("productInfo")}
                        setProductInfo={setValue}
                        sizes={getValues("sizes")}
                        errors={fieldState.error}
                      />
                      {fieldState.error && (
                        <InputError>{fieldState.error.message}</InputError>
                      )}
                    </>
                  );
                }}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="btn btn-primary mt-4 !text-text"
                type="submit"
                disabled={
                  isSubmitting ||
                  hasOverAssignedQuantity ||
                  !productInfo.length ||
                  !sizes?.length
                }
              >
                {isSubmitting ? "Creating..." : "Add Product"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
      {isSubmitting && (
        <div className="absolute inset-0 h-full w-full flex items-center justify-center bg-slate-400 bg-opacity-75 z-10 scale-x-[1.04] scale-y-[1.06]">
          <span className="loading loading-infinity w-[4rem] bg-white"></span>
        </div>
      )}
    </div>
  );
};

export default AddProductForm;
