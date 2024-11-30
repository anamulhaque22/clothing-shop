import AllProductList from "@/views/all-product";

export function generateMetadata() {
  return {
    title: "Products",
  };
}

export default function InternalPage() {
  return (
    <div className="bg-content-bg px-5 py-3 rounded-xl border border-bc">
      <AllProductList />
    </div>
  );
}
