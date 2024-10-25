"use client";
import withPageRequiredAuth from "@/services/auth/page-with-required-auth";
import BestSellingProduct from "./components/BestSellingProduct";
import RevenueChart from "./components/RevenueChart";
import StatisticsOverview from "./components/StatisticsOverview";

/*
  Dashboard feature list
    - Total revenue
    - Total orders
    - Total products
    - Total users

    - Best selling products
    - Revenue chart
    - Transaction (Total mount by card, cash, etc)
*/
function Deshboard() {
  return (
    <>
      <StatisticsOverview />
      <div className="grid grid-cols-2 gap-x-5 mt-6">
        <RevenueChart />
        <BestSellingProduct />
      </div>
    </>
  );
}

export default withPageRequiredAuth(Deshboard);
