import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/organisms/layout/NavBar";
import Footer from "@/components/organisms/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS+Django TodoList",
  description: "A todolist app with an api made in Django",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar />
      {children}
      <Footer />
      </body>
    </html>
  );
}
