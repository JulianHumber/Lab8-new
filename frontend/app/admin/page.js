"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:3000/api/admin/users", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          alert("Is Not authorized");
          router.push("/dashboard");
        }
        return res.json();
      })
      .then(setUsers);
  }, []);

  const assignRole = async (theuserId, newTheRole) => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:3000/api/admin/assign-role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ theuserId, theRole: newTheRole }),
    });

    alert("Role updated");
    window.location.reload();
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      {users.map((u) => (
        <div key={u.theuserId}>
          <p>{u.username} - {u.role}</p>

          <button onClick={() => assignRole(u.theuserId, "admin")}>Make Admin</button>
          <button onClick={() => assignRole(u.theuserId, "customer")}>Make Customer</button>

          <hr />
        </div>
      ))}
    </div>
  );
}