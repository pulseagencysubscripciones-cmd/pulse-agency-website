import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pulse Agency | Growth Marketing & AI",
  description: "Impulsamos el crecimiento empresarial con datos, inteligencia artificial y ejecución estratégica.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased text-white bg-black flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-1 flex flex-col pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
