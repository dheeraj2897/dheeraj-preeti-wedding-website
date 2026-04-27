import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dheeraj & Preethi · 29 June 2026",
  description:
    "Join us as we celebrate the wedding of Dheeraj and Preethi on 29 June 2026.",
  openGraph: {
    title: "Dheeraj & Preethi · 29 June 2026",
    description:
      "Join us as we celebrate the wedding of Dheeraj and Preethi on 29 June 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#6d001f] text-cream">{children}</body>
    </html>
  );
}
