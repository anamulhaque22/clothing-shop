import Header from "./Header";

function PageContent({ children }) {
  // console.log("PageContent: ", children);

  return (
    <div className="drawer-content flex flex-col ">
      <Header />
      <main className="flex-1 overflow-y-auto pt-8 px-6  bg-secondary">
        {children}
        <div className="h-16"></div>
      </main>
    </div>
  );
}

export default PageContent;
