import EditUser from "@/views/edit-user";

export function generateMetadata() {
  return {
    title: "Edit User",
  };
}

export default function InternalPage() {
  return <EditUser />;
}
