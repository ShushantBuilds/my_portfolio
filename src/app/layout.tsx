// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactLenisProvider from "./components/ReactLenisProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Engineering the Future",
  description: "Kinetic Schematic Portfolio Hero",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-950 text-neutral-50 antialiased selection:bg-neutral-800`}>
        {/* We wrap the content in the Lenis provider for smooth scrolling */}
        <ReactLenisProvider>
          {children}
        </ReactLenisProvider>
      </body>
    </html>
  );
}