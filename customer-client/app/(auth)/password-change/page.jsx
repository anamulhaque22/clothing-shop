import NewPassword from "./page-content";
export function generateMetadata() {
  return {
    title: "Change password",
  };
}
export default async function CreateNewPasswordPage() {
  return <NewPassword />;
}
