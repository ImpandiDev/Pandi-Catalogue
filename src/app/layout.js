import React from 'react';
import "./globals.css";
import AppContextProvider from "../context";

export const metadata = {
  metadataBase: new URL('https://pandi.com.ec'),
  title: "Catálogo Pandi",
  description: "Catálogo exclusivo de productos Pandi en IMPANDI.",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  icons: {
    icon: "/icon.jpg",
    shortcut: "/icon.jpg",
    apple: "/icon.jpg",
  },
  openGraph: {
    siteName: "Pandi",
    locale: "es_EC",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        {/* Load elegant Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen text-dark" style={{ overflowX: "hidden" }}>
        <AppContextProvider>
          <main className="min-h-screen bg-catalogo">
            {children}
          </main>
        </AppContextProvider>
      </body>
    </html>
  );
}
