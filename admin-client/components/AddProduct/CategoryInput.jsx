import { useState } from "react";
const categories = [
  {
    id: 1,
    name: "Men",
    subCategory: [
      {
        id: 143,
        name: "Shirt",
        subCategory: [
          {
            id: 1,
            name: "Full Sleeve",
            subCategory: [
              { id: 42, name: "Formal" },
              { id: 43, name: "Casual" },
            ],
          },
          {
            id: 2,
            name: "Half Sleeve",
            subCategory: [
              { id: 42, name: "Formal" },
              { id: 43, name: "Casual" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Women",
    subCategory: [
      {
        id: 143,
        name: "Shirt",
        subCategory: [
          {
            id: 1,
            name: "Full Sleeve",
            subCategory: [
              { id: 42, name: "Formal" },
              { id: 43, name: "Casual" },
            ],
          },
          {
            id: 2,
            name: "Half Sleeve",
            subCategory: [
              { id: 42, name: "Formal" },
              { id: 43, name: "Casual" },
            ],
          },
        ],
      },
    ],
  },
];
export default function CategoryInput({ category, setCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const renderCategoryOptions = (categories, level = 0) => {
    return categories.map((category, i) => {
      const categoryName = category.name;

      return (
        <li
          key={category.id}
          onClick={(e) => {
            e.stopPropagation();
            handleCategorySelect(category);
          }}
          className={`list-inside  w-full`}
          style={{
            paddingLeft: `${level === 0 ? 0 : 20}px`,
            cursor: "pointer",
            fontSize: `${17 - level}px`,
          }}
        >
          <div
            className={`w-full hover:bg-bc px-2 py-1${
              category.subCategory && category.subCategory.length
                ? " font-semibold"
                : " font-normal"
            }`}
          >
            {i + 1}. {categoryName}
          </div>
          {category.subCategory && category.subCategory.length > 0 && (
            <ol className="">
              {renderCategoryOptions(category.subCategory, level + 1)}
            </ol>
          )}
        </li>
      );
    });
  };
  const handleCategorySelect = (category) => {
    setCategory({ id: category.id, name: category.name });
    setIsOpen(false); // Close dropdown after selection
  };
  return (
    <div className="basis-1/2">
      <label className="flex flex-col py-2 text-text label-text">
        Category:
      </label>
      <div className="relative">
        <div
          className="text-text border border-[#a6adbb33] bg-secondary h-10 px-4 flex items-center justify-between rounded-md cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {category?.name ? category.name : "Select Category"}
        </div>
        {isOpen && (
          <ol
            className="text-text options absolute top-full left-0	bg-secondary border border-bc rounded-lg px-4 py-2 h-[400px] overflow-hidden overflow-y-scroll z-50"
            style={{
              scrollbarWidth: "thin",
            }}
          >
            {renderCategoryOptions(categories)}
          </ol>
        )}
      </div>
    </div>
  );
}
