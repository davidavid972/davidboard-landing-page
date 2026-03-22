import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = (env.VITE_SITE_URL || "").replace(/\/$/, "");

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      {
        name: "seo-index-and-sitemap",
        transformIndexHtml(html) {
          const ogImage = siteUrl ? `${siteUrl}/og-image.png` : "/og-image.png";
          let out = html.replace(/__OG_IMAGE__/g, ogImage);
          if (!siteUrl) {
            out = out.replace(/<!-- SEO_CANONICAL_START -->[\s\S]*?<!-- SEO_CANONICAL_END -->\s*/g, "");
            out = out.replace(/<!-- SEO_OGURL_START -->[\s\S]*?<!-- SEO_OGURL_END -->\s*/g, "");
            out = out.replace(/<!-- SEO_JSONLD_START -->[\s\S]*?<!-- SEO_JSONLD_END -->\s*/g, "");
            out = out.replace(/<!-- SEO_HREFLANG_START -->[\s\S]*?<!-- SEO_HREFLANG_END -->\s*/g, "");
          } else {
            out = out.replaceAll("__SITE_URL__", siteUrl);
          }
          out = out.replace(/<!-- SEO_[A-Z_]+_(START|END) -->\s*/g, "");
          return out;
        },
        closeBundle() {
          const distDir = path.resolve(__dirname, "dist");
          if (!siteUrl || !fs.existsSync(distDir)) return;
          const lastmod = new Date().toISOString().slice(0, 10);
          const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
          fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap, "utf8");
          const robotsPath = path.join(distDir, "robots.txt");
          if (fs.existsSync(robotsPath)) {
            let robots = fs.readFileSync(robotsPath, "utf8").trimEnd();
            if (!robots.includes("Sitemap:")) {
              robots += `\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
              fs.writeFileSync(robotsPath, robots + "\n", "utf8");
            }
          }
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
