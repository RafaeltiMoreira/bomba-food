import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cyqs77l9sw.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "u9a6wmr3as.ufs.sh",
      },
    ]
  }
};

export default nextConfig;
