"use client";

import { useState, useEffect } from "react";

export default function TestAPIPage() {
  const [apiResponse, setApiResponse] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log("Testing API...");
        const response = await fetch(
          "https://opentdb.com/api.php?amount=5&category=22&type=multiple"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);
        setApiResponse(data);
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    testAPI();
  }, []);

  if (loading) return <div className="p-8">Loading API test...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test Results</h1>

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded mb-4">
          Error: {error}
        </div>
      )}

      {apiResponse && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-2">Response:</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(apiResponse, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
