import UserListView from "@/views/user-list";

export function generateMetadata() {
  return {
    title: "Users",
  };
}

export default function InternalPage() {
  return <UserListView />;
}