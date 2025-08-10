import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import FooterSection from "@/components/Footer/footer-section";

export const metadata: Metadata = {
  title: "Home - CryptoVault",
  description: "CryptoVault",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <FooterSection/>
      </body>
    </html>
  );
}
