import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/App.Context";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Store - Premium Electronics",
    template: "%s | Store",
  },
  description:
    "Discover premium electronics and accessories. Shop the latest in headphones, laptops, phones, and more.",
  keywords: ["electronics", "shop", "headphones", "laptops", "phones", "accessories"],
  authors: [{ name: "Store" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Store",
    title: "Store - Premium Electronics",
    description:
      "Discover premium electronics and accessories. Shop the latest in headphones, laptops, phones, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Store - Premium Electronics",
    description:
      "Discover premium electronics and accessories.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppContextProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#18181b",
                color: "#fff",
                borderRadius: "12px",
              },
            }}
          />
        </AppContextProvider>
      </body>
    </html>
  );
}
