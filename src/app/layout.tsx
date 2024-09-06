import "~/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "NuggetHub",
  icons: [{ rel: "icon", url: "/icon.webp" }],
  twitter: {
    images: {
      url: '/banner.png',
    },
  },
  openGraph: {
    title: 'NuggetHub',
    description: 'NuggetHub',
    images: [
      {
        url: "/banner.png",
        width: 318,
        heigth: 141
      }
    ]
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>{children}</body>
    </html>
  );
}
