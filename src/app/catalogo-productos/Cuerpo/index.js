"use client";
import React, { useEffect, useRef } from "react";
import Producto from '../Producto';
import Loader from '@/components/Loader';
import LinkButton from "@/components/LinkButton";

function Cuerpo({ data, loading, loadingMore, hasMore, loadMore }) {

    // ─── Infinite scroll sentinel ──────────────────────────────────────────────
    const sentinelRef = useRef(null);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            {
                // Start loading a bit before the user hits the very bottom
                rootMargin: '200px',
                threshold: 0,
            }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [loadMore]);

    // ──────────────────────────────────────────────────────────────────────────

    return (
        <section id="ProductsCatalogue" className="w-full min-h-[50vh] relative">

            {/* Initial Loading Overlay */}
            {loading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center min-h-[300px] z-10 rounded-xl">
                    <div className="flex flex-col items-center gap-3">
                        <Loader />
                        <p className="text-xs md:text-sm font-bold text-gray-500 animate-pulse mt-2">
                            Cargando catálogo...
                        </p>
                    </div>
                </div>
            )}

            {/* Grid of Product Cards */}
            {!loading && data && data.length > 0 ? (
                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center justify-center gap-4 md:gap-6 py-2">
                    {data.map((producto, index) => (
                        <Producto
                            key={producto.id || index}
                            id={producto.id}
                            codigoAux={producto.codigoAux}
                            marca={producto.marca}
                            nombre={producto.nombre}
                            precio={producto.precio}
                            precioMinorista={producto.precioMinorista}
                            unidadDeVenta={producto.unidadDeVenta}
                            stock={producto.stock}
                            img={producto.imagen}
                            categorias={producto.categorias}
                        />
                    ))}
                </div>
            ) : !loading && (
                <div className="w-full flex flex-col items-center justify-center min-h-[300px] p-6 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50">
                    <h3 className="text-xl md:text-2xl font-black text-gray-700">
                        No se encontraron productos
                    </h3>
                    <p className="text-xs md:text-sm text-gray-400 font-semibold max-w-sm mt-2 mb-4 leading-normal">
                        Intenta limpiar los filtros o buscar otros términos para encontrar productos Pandi.
                    </p>
                    <LinkButton
                        href="/"
                        text="Ver todo el catálogo"
                    />
                </div>
            )}

            {/* Infinite scroll sentinel — always rendered below the grid */}
            <div ref={sentinelRef} className="w-full h-1" aria-hidden="true" />

            {/* Loading more spinner */}
            {loadingMore && (
                <div className="w-full flex flex-col items-center justify-center gap-3 py-8">
                    <Loader />
                    <p className="text-xs md:text-sm font-bold text-gray-400 animate-pulse">
                        Cargando más productos...
                    </p>
                </div>
            )}

            {/* End of catalogue message */}
            {!loading && !loadingMore && !hasMore && data && data.length > 0 && (
                <p className="w-full text-center text-xs text-gray-300 font-semibold tracking-wide uppercase">
                    — Fin del catálogo —
                </p>
            )}

        </section>
    );
}

export default Cuerpo;
