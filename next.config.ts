import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Content lives in /content and is read with fs at build time.
  // INTEGRATION: when moving content to a database, this tracing include can be removed.
  outputFileTracingIncludes: { "/**": ["./content/**/*"] },
};

export default nextConfig;
