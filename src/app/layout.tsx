// import type { Metadata } from "next";
"use client";
import "./globals.css";
import "@flaticon/flaticon-uicons/css/all/all.css";
import Navigation from "./components/navigation";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Aos from "aos";
import { usePathname, useRouter } from "next/navigation";
import "sal.js/dist/sal.css";


// export const metadata: Metadata = {
//   title: {
//     default: "Palette",
//     template: "%s | Palette",
//   },
//   description: "Extract colors hue from images easily",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  const handleTitle = () => {
    switch (pathname) {
      case "/":
        return (document.title = "Palette");
      case "/store":
        return (document.title = "Store");
      case "/fav":
        return (document.title = "Fav");
      default:
        return "Palette";
    }
  };

  useEffect(() => {
    handleTitle();
    window.scrollTo(0, 0);
  }, [pathname, router]);

  useEffect(() => {
    Aos.init({
      offset: 0,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Palette</title>
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
