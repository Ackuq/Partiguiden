import "./global.css";
import { Roboto } from "next/font/google";
import { Suspense, type PropsWithChildren } from "react";
import Head from "./head";
import Footer from "./footer";
import Header from "@components/header/header";
import { ThemeProvider } from "@components/providers/theme-provider";

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
        className={`${roboto.className} bg-background-light dark:bg-background-dark text-font-light dark:text-font-dark flex min-h-screen flex-col shadow-sm`}
      >
        <ThemeProvider attribute="class">
          <Header />
          <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}