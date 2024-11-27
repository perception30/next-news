import "./globals.css";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export const metadata: Metadata = {
  title: "World News Today - Latest Breaking News & Headlines",
  description:
    "Stay informed with the latest breaking news, in-depth stories, and comprehensive coverage from around the globe. Get updates on politics, technology, business, entertainment, and more.",
  applicationName: "World News Today",
  authors: [{ name: "World News Today" }],
  keywords: [
    "news",
    "breaking news",
    "world news",
    "headlines",
    "current events",
    "daily news",
  ],
  creator: "World News Today",
  publisher: "World News Today",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/globe.svg",
    apple: "/globe.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased scroll-smooth">
      <body className="min-h-screen bg-[var(--background)] selection:bg-[var(--accent)]/10 selection:text-[var(--accent)] backdrop-blur-3xl">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--accent)]/10 via-background to-background" />
        {children}
      </body>
    </html>
  );
}
