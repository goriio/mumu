import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import { MainLayout } from "~/components/layouts/main-layout";
import { Toaster } from "~/components/ui/sonner";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mumu",
  description: "Music player.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexendDeca.className} antialiased bg-slate-950 text-slate-200`}
      >
        <MainLayout>{children}</MainLayout>
        <Toaster expand />
      </body>
    </html>
  );
}
