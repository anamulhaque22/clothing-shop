export default function Loading({ isLoading }) {
  return (
    <>
      {isLoading && (
        <div className="h-screen w-screen flex items-center justify-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      )}
    </>
  );
}
