/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@apricity/shared"],
  // Old Wix URLs -> new routes (see docs/02-plan.md). "/about" keeps its path with new meaning.
  async redirects() {
    return [
      { source: "/technology", destination: "/about", permanent: true },
      { source: "/blank-1", destination: "/products/matrix-track-2", permanent: true },
      { source: "/blank-2", destination: "/careers", permanent: true },
      { source: "/blank-4", destination: "/", permanent: true },
      { source: "/blank-4-1", destination: "/support-policy", permanent: true },
      { source: "/terms-and-coniditions", destination: "/terms-and-conditions", permanent: true },
    ];
  },
};
export default nextConfig;
