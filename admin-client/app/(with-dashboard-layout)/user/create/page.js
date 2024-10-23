export default function page() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:flex-wrap">
        <div className="flex-[0_0_auto] sm:w-3/12 pr-4">
          <div>create user</div>
        </div>
        <div className="flex-[0_0_auto] sm:w-3/4 pl-4 overflow-x-auto">
          <div>user list</div>
        </div>
      </div>
    </div>
  );
}
