/* eslint-disable @next/next/no-css-tags */
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/components/providers/AuthProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "KhostiGPT | AI Chat Assistant",
    template: "%s | KhostiGPT",
  },
  description:
    "KhostiGPT is a fast AI chat assistant for writing, research, coding, and everyday questions.",
  applicationName: "KhostiGPT",
  keywords: [
    "AI assistant",
    "AI chat",
    "coding assistant",
    "writing assistant",
  ],
  authors: [{ name: "KhostiGPT" }],
  creator: "KhostiGPT",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    siteName: "KhostiGPT",
    url: "/",
    title: "KhostiGPT | AI Chat Assistant",
    description:
      "A fast AI chat assistant for writing, research, coding, and everyday questions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KhostiGPT | AI Chat Assistant",
    description:
      "A fast AI chat assistant for writing, research, coding, and everyday questions.",
  },
  icons: {
    icon: [{ url: "/assets/images/logo.png", type: "image/png" }],
    shortcut: ["/assets/images/logo.png"],
  },
};

export const viewport = {
  themeColor: "#212121",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body className="min-h-full bg-[#212121] font-sans text-[#ececec]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
