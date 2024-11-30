import AddUser from "@/views/add-user";

export function generateMetadata() {
  return {
    title: "Add User",
  };
}

export default function page() {
  return <AddUser />;
}
