import Image from "next/image";
import Link from "next/link";

const Product = ({ productCategory, product }) => {
  return (
    <div>
      <div className="relative">
        <Image
          src={product?.images?.[0]?.imageUrl}
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
          <Link
            href={`/products/${productCategory}/${product?.id}`}
            className="truncate text-base font-causten-semi-bold text-secondary"
          >
            {product?.title}
          </Link>
          <p className="text-sm font-causten-medium text-gray-500">
            AS{"'"}s Brand
          </p>
        </div>
        <div>
          <p className="font-causten-bold text-sm inline-block bg-off-white-light py-2 px-4 rounded-md">
            {product?.sellPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
