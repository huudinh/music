// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    distDir: "build",
    output: "export",
    basePath: "/mp3",
    assetPrefix: "/mp3",
};

export default nextConfig;
