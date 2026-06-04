import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeSafelist } from "@/components/theme/theme-safelist";
import { ThemeScript } from "@/components/theme/theme-script";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAXLABS I.T SOLUTIONS",
  description:
    "MAXLABS I.T. SOLUTIONS helps businesses maximize performance through practical digitalization, automation, and scalable technology implementation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full overflow-x-clip antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col overflow-x-clip bg-[var(--background)] text-[var(--foreground)] antialiased">
        <ThemeSafelist />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
