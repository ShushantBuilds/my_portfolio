// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactCompiler: true,
//   devIndicators : false
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this block to hide the floating logo
  devIndicators: {
    buildActivity: false,
  },
};

export default nextConfig;