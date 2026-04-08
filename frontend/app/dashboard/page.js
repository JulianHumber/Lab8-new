"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <h1>Main Dashboard</h1>

      <button onClick={() => router.push("/profile")}>TheProfile</button>
      <button onClick={() => router.push("/policies")}>ThePolicies</button>
      <button onClick={() => router.push("/claims")}>TheClaims</button>
      <button onClick={() => router.push("/admin")}>TheAdmin</button>
    </div>
  );
}