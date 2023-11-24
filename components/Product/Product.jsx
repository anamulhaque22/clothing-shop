import Image from "next/image";

const Product = () => {
  return (
    <div>
      <div className="relative">
        <Image
          src="/images/porduct.jpg"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          alt="product"
        />
        <div className="w-[32px] h-[32px] flex justify-center bg-white absolute top-5 right-4 rounded-full">
          <Image
            src={"/images/icon/heart.svg"}
            width={15}
            height={15}
            alt="Heart Icon"
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-7">
        <div className="overflow-hidden">
          <h3 className="truncate text-base font-causten-semi-bold text-secondary">
            Product Name Product NameProduct NameProduct NameProduct NameProduct
            NameProduct NameProduct Name
          </h3>
          <p className="text-sm font-causten-medium text-gray-500">
            AS{"'"}s Brand
          </p>
        </div>
        <div>
          <p className="font-causten-bold text-sm inline-block bg-off-white-light py-2 px-4 rounded-md">
            $123.00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
