import type { Metadata, Viewport } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ToastProvider } from "@/components/ui/Toast";
import { themeInitScript } from "@/components/layout/ThemeToggle";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.brand.url),
  title: { default: `${siteConfig.brand.name} — CFA®, FRM® and Finance Skills`, template: `%s | ${siteConfig.brand.name}` },
  description: siteConfig.brand.description,
  openGraph: { title: siteConfig.brand.name, description: siteConfig.brand.description, type: "website" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: siteConfig.palette.light.background },
    { media: "(prefers-color-scheme: dark)", color: siteConfig.palette.dark.background },
  ],
};

function kebab(s: string) {
  return s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

/** Palette from config/site.ts → CSS variables (light on :root, dark on .dark). */
function paletteCss(): string {
  const toVars = (p: Record<string, string>) =>
    Object.entries(p)
      .map(([k, v]) => `--c-${kebab(k)}:${v};`)
      .join("");
  return `:root{${toVars(siteConfig.palette.light)}color-scheme:light;}.dark{${toVars(siteConfig.palette.dark)}color-scheme:dark;}`;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: paletteCss() }} />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
          Skip to content
        </a>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
