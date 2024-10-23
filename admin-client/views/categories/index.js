import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";

export default function Categories() {
  return (
    <div className="flex  flex-col sm:flex-row sm:flex-wrap">
      <div className="flex-[0_0_auto] sm:w-3/12 pr-4">
        <CategoryForm />
      </div>
      <div className="flex-[0_0_auto] sm:w-3/4 pl-4 overflow-x-auto">
        <CategoryList />
      </div>
    </div>
  );
}
