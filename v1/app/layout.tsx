import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { shipporiMincho } from "@/lib/fonts";
import { content } from "@/content/content";
import ShaderCanvas from "@/components/Shader/ShaderCanvas";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: content.meta.title,
    template: `%s — ${content.hero.name}`,
  },
  description: content.meta.description,
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    siteName: content.hero.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.title,
    description: content.meta.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${shipporiMincho.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-10 pointer-events-none"
        >
          <ShaderCanvas />
        </div>
        <main className="flex-1">{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
