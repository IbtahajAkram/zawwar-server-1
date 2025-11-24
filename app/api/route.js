export async function GET(request) {
  const url = new URL(request.url);

  return Response.json(
    {
      success: true,
      message: "🚀 Server is running successfully!",
      serverInfo: {
        environment: process.env.NODE_ENV || "development",
        runtime: `Node.js ${process.version}`,
        hostname: url.hostname,
        protocol: url.protocol.replace(":", ""),
        port:
          process.env.NODE_ENV === "development"
            ? "3000 (default Next.js dev port)"
            : "⚠️ Production server assigns port automatically",
        fullUrl: url.href,
      },
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
