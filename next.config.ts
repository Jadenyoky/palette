import type { NextConfig } from "next";
import withPwaInit from "@ducanh2912/next-pwa";

const withPwa = withPwaInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  fallbacks: {
    document: "/~offline",
  },
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withPwa(nextConfig);
