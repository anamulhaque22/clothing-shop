import UserDetails from "@/views/user-details";

export function generateMetadata() {
  return {
    title: "User Details",
  };
}

export default function InternalUserDetailsPage() {
  return <UserDetails />;
}
