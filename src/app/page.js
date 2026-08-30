import React, { Suspense } from "react";
import Loader from "@/components/Loader";
import PandiCatalogClient from "./PandiCatalogClient";

export const metadata = {
  title: "IMPANDI | Catálogo Pandi",
  description: "Descubre el catálogo de productos Pandi en IMPANDI. Una amplia variedad de suministros de oficina, sellos, fechadores y papelería al mejor precio.",
  keywords: "IMPANDI, Pandi, sellos, fechadores, suministros de oficina, papelería, escolar, ferretería, catálogo",
  robots: "index, follow",
  openGraph: {
    title: "IMPANDI | Catálogo Pandi",
    description: "Descubre el catálogo de productos Pandi en IMPANDI. Una amplia variedad de suministros de oficina, sellos, fechadores y papelería al mejor precio.",
    url: "https://pandi.com.ec",
    siteName: "IMPANDI",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Logo IMPANDI - Catálogo Pandi",
      },
    ],
    locale: "es_EC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IMPANDI | Catálogo Pandi",
    description: "Descubre el catálogo de productos Pandi en IMPANDI. Una amplia variedad de suministros de oficina, sellos, fechadores y papelería al mejor precio.",
    images: ["/images/logo.png"],
  },
};

export default function Home() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen bg-catalogo flex flex-col items-center justify-center">
        <Loader />
        <p className="text-sm font-bold text-gray-500 animate-pulse mt-4">
          Iniciando Catálogo Pandi...
        </p>
      </div>
    }>
      <PandiCatalogClient />
    </Suspense>
  );
}
