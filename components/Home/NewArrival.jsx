"use client";
import Image from "next/image";
import Slider from "react-slick";
import SectionHeading from "../typhography/SectionHeading";

const NewArrival = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="container section-space">
      <SectionHeading text={"New Arrival"} />
      <div className="new-arrival mt-8 sm:mt-12">
        <Slider {...settings}>
          <div className="mx-0 sm:mx-10">
            <Image
              src="/images/new-arival.png"
              width={260}
              height={260}
              alt="New Arrival"
            />
            <h4 className="font-causten-bold text-xl mt-6">Knitted Joggers</h4>
          </div>
          <div className="mx-0 sm:mx-10">
            <Image
              src="/images/new-arival.png"
              width={260}
              height={260}
              alt="New Arrival"
            />
            <h4 className="font-causten-bold text-xl mt-6">Knitted Joggers</h4>
          </div>
          <div className="mx-0 sm:mx-10">
            <Image
              src="/images/new-arival.png"
              width={260}
              height={260}
              alt="New Arrival"
            />
            <h4 className="font-causten-bold text-xl mt-6">Knitted Joggers</h4>
          </div>
          <div className="mx-0 sm:mx-10">
            <Image
              src="/images/new-arival.png"
              width={260}
              height={260}
              alt="New Arrival"
            />
            <h4 className="font-causten-bold text-xl mt-6">Knitted Joggers</h4>
          </div>
          <div className="mx-0 sm:mx-10">
            <Image
              src="/images/new-arival.png"
              width={260}
              height={260}
              alt="New Arrival"
            />
            <h4 className="font-causten-bold text-xl mt-6">Knitted Joggers</h4>
          </div>
          <div className="mx-0 sm:mx-10">
            <Image
              src="/images/new-arival.png"
              width={260}
              height={260}
              alt="New Arrival"
            />
            <h4 className="font-causten-bold text-xl mt-6">Knitted Joggers</h4>
          </div>
          <div className="mx-0 sm:mx-10">
            <Image
              src="/images/new-arival.png"
              width={260}
              height={260}
              alt="New Arrival"
            />
            <h4 className="font-causten-bold text-xl mt-6">Knitted Joggers</h4>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default NewArrival;
