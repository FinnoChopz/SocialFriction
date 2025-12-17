import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AmbientBackgroundRoot } from "@/components/AmbientBackgroundRoot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Social Friction Lab | AI Companionship, Sycophancy, and the Cost of Comfort",
  description: "A research final project exploring how AI companions optimized for user comfort might reshape social learning, truth-seeking, and the role of friction in human interaction.",
  keywords: ["AI", "sycophancy", "social friction", "RLHF", "AI companions", "social learning"],
  authors: [{ name: "Finn McCooe" }],
  openGraph: {
    title: "Social Friction Lab",
    description: "AI companionship, sycophancy, and the cost of comfort.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground min-h-screen`}
      >
        <AmbientBackgroundRoot />
        <div className="fixed inset-0 z-[1] bg-background/40 pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
