// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.pexels.com",
//       },
//       {
//         protocol: "https",
//         hostname: "www.pexels.com", // ✅ Allow www.pexels.com
//       },
//       {
//         protocol: "https",
//         hostname: "example.com",
//       },
//     ],
//   },
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // Allow any domain
      },
    ],
  },
};

module.exports = nextConfig;
