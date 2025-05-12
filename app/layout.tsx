import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shadcn Storybook Registry",
    template: `%s | Shadcn Storybook Registry`,
  },
  description: "A collection of stories for the components of shadcn/ui",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-primary flex flex-row-reverse px-4 py-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/storybook" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Storybook
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </header>
        {children}
        <footer className="flex flex-row items-center justify-between px-4 py-2">
          <Button variant="link" asChild>
            <a href="https://www.lloydrichards.dev" target="_blank">
              lloydrichards.dev
            </a>
          </Button>
          <Button variant="link" asChild>
            <a
              href="https://github.com/lloydrichards/shadcn-storybook-registry"
              target="_blank"
            >
              <Code2 size={24} /> Repo
            </a>
          </Button>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
