import { Geist, Geist_Mono, Syne, DM_Sans, Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
// import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata = {
  title: "portfolio",
  description: "Here i am sharing my full work experience and studies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${dmSans.variable} ${orbitron.variable} ${rajdhani.variable} antialiased`}
      >
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}