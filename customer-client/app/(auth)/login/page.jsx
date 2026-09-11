import SignIn from "./page-content";

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
