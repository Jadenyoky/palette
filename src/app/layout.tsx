import type { Metadata } from "next";
import "./globals.css";
import "@flaticon/flaticon-uicons/css/all/all.css";
import Navigation from "./components/navigation";
import "aos/dist/aos.css";

export const metadata: Metadata = {
  title: {
    default: "Color Hue",
    template: "%s | Color Hue",
  },
  description: "Extract colors hue from images easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Asap:ital,wght@0,100..900;1,100..900&family=Inconsolata:wght@200..900&family=Maven+Pro:wght@400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-svh flex flex-col justify-between gap-8">
        <main className="flex flex-col justify-between rounded-xl w-[600px] max-md:w-full mx-auto flex-1">
          {children}
        </main>
        <Navigation />
      </body>
    </html>
  );
}
