"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [serverInfo, setServerInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch server status from API
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setServerInfo(data);
        setLoading(false);
      })
      .catch(() => {
        setServerInfo({ status: false, message: "Server not reachable" });
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans px-4">
      <main className="bg-white dark:bg-zinc-900 shadow-xl rounded-3xl p-12 max-w-3xl w-full text-center flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-black dark:text-white">
          🚀 Server Status
        </h1>

        {loading ? (
          <p className="text-gray-500 dark:text-gray-300">Loading...</p>
        ) : (
          <div className="space-y-4 text-left w-full">
            <p className="text-lg">
              <span className="font-semibold">Status:</span>{" "}
              {serverInfo?.success ? "Running Properly" : "❌ Not Running"}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Message:</span>{" "}
              {serverInfo?.message || "No message"}
            </p>
            {serverInfo?.serverInfo && (
              <>
                <p className="text-lg">
                  <span className="font-semibold">Environment:</span>{" "}
                  {serverInfo.serverInfo.environment}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Node Version:</span>{" "}
                  {serverInfo.serverInfo.runtime}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Host:</span>{" "}
                  {serverInfo.serverInfo.hostname}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Port:</span>{" "}
                  {serverInfo.serverInfo.port}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">URL:</span>{" "}
                  {serverInfo.serverInfo.fullUrl}
                </p>
              </>
            )}
            <p className="text-lg text-black mt-4">
              Made by <strong>Muhammad Zawwar Akram</strong>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
