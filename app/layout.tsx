import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Suno Music Generator",
  description: "Harness the power of suno.ai's music generation AI by leveraging its API to create captivating melodies.",
  keywords: "Suno, Suno AI, Music Generator, Suno Music Generator",
  creator: "Alvin-Liu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster position="top-center" richColors />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
