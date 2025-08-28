import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "NextDash",
  description: "Admin Panel",
    icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
