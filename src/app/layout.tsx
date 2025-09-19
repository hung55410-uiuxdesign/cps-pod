import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import {ThemeProvider} from "@/components/provider/ThemeProvider";
import MainFrame from "@/components/layout/frames/main-frame";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: [
    "100", "200", "300",
    "400", "500", "600",
    "700", "800", "900"
  ],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CPS Pod",
  description: "Next.js application with Radix UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={beVietnamPro.variable} suppressHydrationWarning>
      <body className={'antialiased'} suppressHydrationWarning>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <MainFrame>
            {children}
          </MainFrame>
        </ThemeProvider>
      </body>
    </html>
  );
}
