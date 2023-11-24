
import BigSavingZone from "@/components/Home/BigSavingZone";
import Cagegories from "@/components/Home/Cagegories";
import EverydayFashion from "@/components/Home/EverydayFashion";
import Hero from "@/components/Home/Hero";
import Limelight from "@/components/Home/Limelight";
import NewArrival from "@/components/Home/NewArrival";
import SpecialDiscount from "@/components/Home/SpecialDiscount";
import TopBrands from "@/components/Home/TopBrands";
import UserFeedbacks from "@/components/Home/UserFeedbacks";

export default function Home() {
  return (
    <main className="">
      <Hero/>
      <SpecialDiscount/>
      <NewArrival/>
      <BigSavingZone/>
      <EverydayFashion/>
      <Cagegories cagegoryFor={"Cagegory For Man"} />
      <TopBrands/>
      <Limelight/>
      <UserFeedbacks/>
    </main>
  )
}
