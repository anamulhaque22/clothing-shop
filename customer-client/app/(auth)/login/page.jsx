import SignIn from "./page-content";
// export const metadata = {
//   title: "Sign in",
//   description: "Sign in to your account",
// };

export const generateMetadata = async () => {
  return {
    title: "Sign in",
    description: "Sign in to your account",
  };
};

function SignInPage() {
  return <SignIn />;
}

export default SignInPage;
