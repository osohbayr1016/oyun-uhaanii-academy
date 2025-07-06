"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";

export default function DebugPage() {
  const { user, token, loading, isAuthenticated, isAdmin, login } = useAuth();
  const [testResult, setTestResult] = useState("");

  const testLogin = async () => {
    setTestResult("Testing login...");
    try {
      const result = await login("admin@example.com", "admin123");
      setTestResult(`Login result: ${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      setTestResult(`Login error: ${error}`);
    }
  };

  const checkAuth = () => {
    const authStatus = {
      user,
      token,
      loading,
      isAuthenticated: isAuthenticated(),
      isAdmin: isAdmin(),
      localStorage: {
        token: localStorage.getItem("token"),
        user: localStorage.getItem("user"),
      },
    };
    setTestResult(`Auth status: ${JSON.stringify(authStatus, null, 2)}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Authentication Debug</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Current State</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p>
              <strong>User:</strong>{" "}
              {user ? JSON.stringify(user, null, 2) : "null"}
            </p>
            <p>
              <strong>Token:</strong> {token ? "Present" : "null"}
            </p>
            <p>
              <strong>Loading:</strong> {loading ? "true" : "false"}
            </p>
            <p>
              <strong>Is Authenticated:</strong>{" "}
              {isAuthenticated() ? "true" : "false"}
            </p>
            <p>
              <strong>Is Admin:</strong> {isAdmin() ? "true" : "false"}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Actions</h2>
          <div className="space-x-4">
            <button
              onClick={testLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Test Login
            </button>
            <button
              onClick={checkAuth}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Check Auth Status
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Result</h2>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap text-sm">
            {testResult || "No test run yet"}
          </pre>
        </div>
      </div>
    </div>
  );
}
