import withPageRequiredAuth from "@/services/auth/page-with-required-auth";

function Deshboard() {
  return (
    <div>
      <h1>Page</h1>
    </div>
  );
}

export default withPageRequiredAuth(Deshboard);
