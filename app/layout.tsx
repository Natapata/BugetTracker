import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import RootProviders from "@/components/providers/RootProviders";

export const metadata: Metadata = {
  title: "Buget Tracker",
  description: "CodeWithKlinton",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
    </ClerkProvider>
  );
}
