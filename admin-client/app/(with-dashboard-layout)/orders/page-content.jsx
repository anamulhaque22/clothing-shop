"use client";

import withPageRequiredAuth from "@/services/auth/page-with-required-auth";
import OrderList from "@/views/order-list";

function OrderListContent() {
  return (
    <div className="bg-content-bg px-5 py-3 rounded-xl border border-bc">
      <OrderList />
    </div>
  );
}

export default withPageRequiredAuth(OrderListContent);
