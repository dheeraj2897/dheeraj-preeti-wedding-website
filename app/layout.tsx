import type { Metadata } from "next";
import BackgroundAudio from "@/components/BackgroundAudio";
import "./globals.css";

export const metadata: Metadata = {
  title: "धीरज एवं प्रीति · २९ जून २०२६",
  description:
    "धीरज और प्रीति के सगाई समारोह में हमारे साथ सम्मिलित होकर उन्हें अपना आशीर्वाद दें।",
  openGraph: {
    title: "धीरज एवं प्रीति · २९ जून २०२६",
    description:
      "धीरज और प्रीति के सगाई समारोह में हमारे साथ सम्मिलित होकर उन्हें अपना आशीर्वाद दें।",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&family=Noto+Serif+Devanagari:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#6d001f] text-cream">
        <BackgroundAudio />
        {children}
      </body>
    </html>
  );
}
