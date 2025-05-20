import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/query-provider";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monum",
  description: "MONUM is a convenient system for project management and teamwork. Create tasks, workspaces, comment, manage statuses - simply and quickly from any device.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(inter.className, "antialised min-h-screen")}
      >
        <Providers>
          <NuqsAdapter>
            <QueryProvider>
              <Toaster />
              {children}
            </QueryProvider>
          </NuqsAdapter>
        </Providers>
      </body>
    </html>
  );
}
