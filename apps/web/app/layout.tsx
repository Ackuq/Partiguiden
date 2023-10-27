import { Roboto } from "next/font/google";
import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import colors from "tailwindcss/colors";

import Header from "@components/header/header";
import { ThemeProvider } from "@components/providers/theme-provider";

import Footer from "./footer";
import "./global.css";
import Head from "./head";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <Head />
      <body
        className={twMerge(
          roboto.className,
          "flex min-h-screen flex-col bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50",
        )}
      >
        <ThemeProvider attribute="class">
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: colors.slate[800] },
    { media: "(prefers-color-scheme: light)", color: colors.teal[700] },
  ],
};

export const metadata = {
  icons: [
    {
      url: "/apple-icon",
    },
  ],
  metadataBase: new URL("https://partiguiden.nu"),
};
