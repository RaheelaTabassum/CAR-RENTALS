// src/app/pages/users/page.js
import UserTable from "./UserTable";

export default async function UsersPage() {
  // Example user data (normally fetched from DB/API)
  const users = [
    { id: 1, name: "Ali Rahman", email: "ali@example.com", role: "ADMIN" },
    { id: 2, name: "Sara Ahmed", email: "sara@example.com", role: "HOSTER" },
    { id: 3, name: "Omar Khalid", email: "omar@example.com", role: "CUSTOMER" },
  ];

  return <UserTable users={users} />;
}
