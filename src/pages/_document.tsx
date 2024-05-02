import { Html, Head, Main, NextScript } from "next/document";
import type { Metadata } from "next";

// components
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Avrae Gsheet Website",
  description: "Created by Foxdapple",
};

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Navbar />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
