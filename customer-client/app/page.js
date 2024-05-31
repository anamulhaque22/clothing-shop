import BigSavingZone from "@/components/Home/BigSavingZone";
import Cagegories from "@/components/Home/Cagegories";
import EverydayFashion from "@/components/Home/EverydayFashion";
import Hero from "@/components/Home/Hero";
import Limelight from "@/components/Home/Limelight";
import NewArrival from "@/components/Home/NewArrival";
import SpecialDiscount from "@/components/Home/SpecialDiscount";
import TopBrands from "@/components/Home/TopBrands";
import UserFeedbacks from "@/components/Home/UserFeedbacks";
import MainNav from "@/components/Navbar/MainNav";
import Footer from "@/components/Shared/Footer";

export default function Home() {
  return (
    <main className="">
      <MainNav />

      <Hero />
      <SpecialDiscount />
      <NewArrival />
      <BigSavingZone />
      <EverydayFashion />
      <Cagegories cagegoryFor={"Cagegory For Man"} />
      <TopBrands />
      <Limelight />
      <UserFeedbacks />
      <Footer />
    </main>
  );
}
