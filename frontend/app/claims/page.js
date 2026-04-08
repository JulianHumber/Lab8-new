"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Claims() {
  const [claims, setClaims] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:3000/api/claims/my", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then(setClaims);
  }, []);

  const submitClaim = async () => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:3000/api/claims", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        policyId: 1, 
        claimAmount: amount,
        description: description,
      }),
    });

    alert("Claim submitted");
    window.location.reload();
  };

  return (
    <div>
      <h1>New Claims</h1>

      <h2>Submit This Claim Now</h2>
      <input
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={submitClaim}>Now Submit</button>

      <h2>My Claims</h2>

      {claims.length === 0 ? (
        <p>No claims</p>
      ) : (
        claims.map((c) => (
          <div key={c.theclaimId}>
            <p>Amount: {c.theclaimAmount}</p>
            <p>Status: {c.thestatus}</p>
            <p>{c.thedescription}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}