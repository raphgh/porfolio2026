import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Default is "attachment", which can blank out optimized images on some
    // mobile Safari / in-app browsers when used with next/image.
    contentDispositionType: "inline",
  },
};

export default nextConfig;
