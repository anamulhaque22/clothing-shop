"use client";
import HTTP_CODES from "@/services/api/constants/http-codes";
import { useGetProductsService } from "@/services/api/services/product";
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import SectionHeading from "../Typography/SectionHeading";

const NewArrival = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = useGetProductsService();
  const displayProducts = useMemo(() => {
    const validProducts = (products || []).filter((product) => {
      return (
        product &&
        (typeof product.id === "number" || typeof product.id === "string") &&
        typeof product.title === "string" &&
        product.title.trim().length > 0
      );
    });

    return removeDuplicatesFromArrayObjects(validProducts, "id");
  }, [products]);

  const isCompactLayout = displayProducts.length <= 2;

  const ProductCard = ({ product, className = "" }) => (
    <div className={className}>
      <Image
        src={
          product?.images?.[0]?.imageUrl ?? "/images/product-placeholder.jpg"
        }
        width={260}
        height={260}
        alt="New Arrival"
        className="object-fill w-64 h-64"
      />
      <div className="w-56">
        <Link
          href={`/products/details/${product.id}`}
          className="font-causten-bold text-xl mt-6 truncate"
        >
          {product.title}
        </Link>
      </div>
    </div>
  );

  const settings = {
    infinite: displayProducts.length > 4,
    speed: 500,
    slidesToShow: Math.min(4, Math.max(displayProducts.length, 1)),
    slidesToScroll: 1,
    centerMode: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, Math.max(displayProducts.length, 1)),
          slidesToScroll: 1,
          infinite: displayProducts.length > 3,
          centerMode: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, Math.max(displayProducts.length, 1)),
          slidesToScroll: 1,
          initialSlide: 0,
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, status } = await fetchProducts({
        page: 1,
        limit: 10,
      });

      if (status === HTTP_CODES.OK) {
        setProducts(Array.isArray(data?.data) ? data.data : []);
      }
    };
    fetchData();
  }, [fetchProducts]);
  return (
    <div className="container section-space">
      <SectionHeading text={"New Arrival"} />
      <div className="new-arrival mt-8 sm:mt-12 slider-container">
        <Slider {...settings}>
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="mx-0 sm:mx-10"
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewArrival;
