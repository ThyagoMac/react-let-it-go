/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "platform.relish.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.mrswages.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media-cldnry.s-nbcnews.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "carrefourbrfood.vtexassets.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
