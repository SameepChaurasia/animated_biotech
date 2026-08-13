import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Preloader } from "@/components/Preloader";
import { CursorTrail } from "@/components/ui/CursorTrail";
import { CustomCursor } from "@/components/ui/CustomCursor";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Codex Bio by Sameep Chaurasia — Engineering the Code of Life",
  description:
    "AI-driven precision genomics & synthetic biology platform created by Sameep Chaurasia. Featuring 3D Three.js molecular structure prediction and generative wet labs.",
  authors: [{ name: "Sameep Chaurasia" }],
  keywords: [
    "Synthetic Biology",
    "Sameep Chaurasia",
    "Generative AI Genomics",
    "Protein Structure Prediction",
    "Three.js 3D Biotech",
    "Codex Bio",
  ],
  openGraph: {
    title: "Codex Bio by Sameep Chaurasia — Engineering the Code of Life",
    description:
      "AI-driven precision genomics platform pairing generative AI with wet-lab synthetic biology. Built by Sameep Chaurasia.",
    siteName: "Codex Bio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-void text-ink font-sans antialiased min-h-screen flex flex-col selection:bg-accent-lime selection:text-void">
        {/* Keyboard Skip to Main Content Link */}
        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        {/* Bioluminescent Custom Cursor & Trail */}
        <CustomCursor />
        <CursorTrail />

        {/* Preloader Animation */}
        <Preloader />

        {/* Smooth Scroll Provider & Global Shell */}
        <SmoothScrollProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
