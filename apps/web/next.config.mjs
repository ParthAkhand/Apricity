/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets `NEXT_DIST=.next-check next build` verify without clobbering a running dev server.
  distDir: process.env.NEXT_DIST || ".next",
  transpilePackages: ["@apricity/shared"],
  // Inline the (small) stylesheet so it does not block first paint.
  experimental: { inlineCss: true },
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
