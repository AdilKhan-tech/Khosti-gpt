import path from "path";
import { fileURLToPath } from "url";
const root = path.dirname(fileURLToPath(import.meta.url));
const nextConfig = {
    compress: true,
    poweredByHeader: false,
    turbopack: {
        root,
    },
};
export default nextConfig;
