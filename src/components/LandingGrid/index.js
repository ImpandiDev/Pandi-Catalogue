"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { LANDING_ITEMS } from "@/data/landingItems";
import config from "../../../public/config";

/** Duration each product image is shown (ms) */
const SLIDE_DURATION = 4000;

/**
 * Validates an array of image URLs by preloading them.
 * Returns only the URLs that load successfully.
 */
function validateImages(urls) {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve(url);
          img.onerror = () => resolve(null);
          img.src = url;
        })
    )
  ).then((results) => results.filter(Boolean));
}

/**
 * Fetches the first page of products for a given etiqueta.
 * Returns an array of validated image URLs (product.imagen).
 */
async function fetchImagesForEtiqueta(etiqueta) {
  try {
    const params = new URLSearchParams({
      etiquetas: etiqueta,
      marcas: "Pandi",
      orden: "popularidad",
      direccion: "asc",
      pagina: "1",
      stock: "todos",
      general: "1",
    });

    const res = await fetch(`${config.obtenerProductos}?${params.toString()}`);
    if (!res.ok) return [];

    const { productos } = await res.json();
    if (!Array.isArray(productos)) return [];

    // Collect unique, non-empty image URLs
    const seen = new Set();
    const candidates = [];
    for (const p of productos) {
      if (p.imagen && !seen.has(p.imagen)) {
        seen.add(p.imagen);
        candidates.push(p.imagen);
      }
    }

    // Validate: only keep images that actually load
    return await validateImages(candidates);
  } catch {
    return [];
  }
}

// ─── Individual carousel card ─────────────────────────────────────────────────

const LandingCard = ({ item, onSelectCategory }) => {
  const [productImages, setProductImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch product images on mount
  useEffect(() => {
    let cancelled = false;
    fetchImagesForEtiqueta(item.label).then((imgs) => {
      if (!cancelled && imgs.length > 0) setProductImages(imgs);
    });
    return () => { cancelled = true; };
  }, [item.label]);

  // Auto-rotate: just swap the index instantly
  useEffect(() => {
    if (productImages.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % productImages.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [productImages.length]);

  // Remove a broken image at runtime (safety net)
  const handleImageError = useCallback((badIndex) => {
    setProductImages((prev) => {
      const next = prev.filter((_, i) => i !== badIndex);
      return next;
    });
    // Reset index to stay in bounds
    setActiveIndex(0);
  }, []);

  // Determine what to show
  const hasProductImages = productImages.length > 0;
  const fallbackSrc = item.image ? `/images/landing/${item.image}` : `/icon.jpg`;

  return (
    <button
      key={item.label}
      type="button"
      onClick={() => onSelectCategory(item.label)}
      className="group relative block w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100 text-left shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainColor"
    >
      <div className="relative aspect-[4/3] w-full bg-white flex items-center justify-center">
        {hasProductImages ? (
          <Image
            src={productImages[activeIndex]}
            alt={item.label}
            fill
            sizes="(max-width: 768px) 46vw, 440px"
            className="object-contain scale-[1.428] transition-transform duration-500 group-hover:scale-[1.5]"
            onError={() => handleImageError(activeIndex)}
          />
        ) : (
          /* Fallback to original static image or icon */
          <Image
            src={fallbackSrc}
            alt={item.label}
            fill
            sizes="(max-width: 768px) 46vw, 440px"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.1]"
          />
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-black/65 px-2 py-1 text-center backdrop-blur-md sm:py-1.5">
        <span className="text-xs font-bold uppercase tracking-wide text-white drop-shadow-sm sm:text-sm">
          {item.label}
        </span>
      </div>
    </button>
  );
};

// ─── Grid ─────────────────────────────────────────────────────────────────────

const LandingGrid = ({ onSelectCategory }) => {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-5 w-full">
      {LANDING_ITEMS.map((item) => (
        <LandingCard
          key={item.label}
          item={item}
          onSelectCategory={onSelectCategory}
        />
      ))}
    </div>
  );
};

export default LandingGrid;
