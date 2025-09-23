import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { fontTSB } from "@/fonts";
import QueryProvider from "./query-provider";
import FingerprintProvider from "./fpjs-provider";

export const metadata: Metadata = {
  title: "Joinda Quest",
  description: "Joinda Quest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontTSB.variable} antialiased`}
      >
        <QueryProvider>
          <FingerprintProvider>
            {children}
            <Toaster richColors />
          </FingerprintProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
