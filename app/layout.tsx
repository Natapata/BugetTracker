import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import RootProviders from "@/components/providers/RootProviders";
import { Toaster } from "@/components/ui/sonner";

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
    <ClerkProvider afterSignOutUrl="/sign-in">
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body>
        <Toaster richColors position="bottom-right"/>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
    </ClerkProvider>
  );
}
