"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    try {
      const res = await fetch("/api/v1/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const body = await res.json();

      if (!res.ok) {
        setError(body.message || "Login failed");
        return;
      }

      const token = body.data;

      localStorage.setItem("token", token);
      sessionStorage.setItem("token", token);

      router.push("/pages/dashboard");
    } catch {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h2
          className="mb-6 text-center text-3xl font-bold"
          style={{ color: "#8e6aa7" }}
        >
          Login
        </h2>

        {error && (
          <div
            className="mb-4 rounded-md p-2 text-sm"
            style={{ backgroundColor: "#f8d7da", color: "#721c24" }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium"
              style={{ color: "#8e6aa7" }}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
              style={{
                borderColor: "#8e6aa7",
                color: "#8e6aa7",
              }}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
              style={{ color: "#8e6aa7" }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
              style={{
                borderColor: "#8e6aa7",
                color: "#8e6aa7",
              }}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md px-4 py-2 font-semibold transition"
            style={{
              backgroundColor: "#8e6aa7",
              color: "white",
            }}
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span style={{ color: "#8e6aa7" }}>New user? </span>
          <button
            type="button"
            onClick={() => router.push("/admin/signup")}
            className="font-semibold hover:underline"
            style={{ color: "#8e6aa7" }}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
