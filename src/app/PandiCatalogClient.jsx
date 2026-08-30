"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import config from '../../public/config';
import TopBar from "@/components/TopBar";
import LandingGrid from "@/components/LandingGrid";
import FiltroEtiquetas from "./catalogo-productos/FiltroEtiquetas";
import FiltroSuperior from "./catalogo-productos/FiltroSuperior";
import Cuerpo from "./catalogo-productos/Cuerpo";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useAppContext } from "@/context";

// Sorting mapping helper
function resolveOrden(ordenDisplay) {
    switch (ordenDisplay) {
        case 'codigo': return { orden: 'codigoAux', direccion: 'asc' };
        case 'nombreAsc': return { orden: 'nombre', direccion: 'asc' };
        case 'nombreDesc': return { orden: 'nombre', direccion: 'desc' };
        case 'precioAsc': return { orden: 'precio', direccion: 'asc' };
        case 'precioDesc': return { orden: 'precio', direccion: 'desc' };
        default: return { orden: 'popularidad', direccion: 'asc' };
    }
}

export default function PandiCatalogClient() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [ultimaActualizacion, setUltimaActualizacion] = useState('');
    const [ordenDisplay, setOrdenDisplay] = useState('popularidad');

    // Infinite scroll state
    const [data, setData] = useState([]);     // accumulated products
    const [loading, setLoading] = useState(true);   // initial / filter-reset load
    const [loadingMore, setLoadingMore] = useState(false); // subsequent page loads
    const [hasMore, setHasMore] = useState(false);
    const currentPageRef = useRef(1);        // internal page tracker (no re-render)

    // Filter states
    const [categorias, setCategoria] = useState('');
    const [etiqueta, setEtiqueta] = useState('');

    const catalogueRef = useRef(null);

    // ─── Helpers ────────────────────────────────────────────────────────────────

    const scrollToCatalogue = useCallback(() => {
        catalogueRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);

    const handleCategorySelect = useCallback((label) => {
        setEtiqueta(label);
        setOrdenDisplay('popularidad');
        requestAnimationFrame(() => scrollToCatalogue());
    }, [scrollToCatalogue]);

    // ─── URL sync (filters only, no pagina) ────────────────────────────────────

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        if (categorias) urlParams.set('categoria', categorias);
        else urlParams.delete('categoria');

        if (etiqueta) urlParams.set('etiqueta', etiqueta);
        else urlParams.delete('etiqueta');

        const { orden, direccion } = resolveOrden(ordenDisplay);
        urlParams.set('orden', orden);
        urlParams.set('direccion', direccion);

        router.push(`?${urlParams.toString()}`, { scroll: false });
    }, [categorias, etiqueta, ordenDisplay, router]);

    // ─── Read initial filters from URL (deep links) ────────────────────────────

    useEffect(() => {
        setCategoria(searchParams.get('categoria') || '');
        setEtiqueta(searchParams.get('etiqueta') || '');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (searchParams.get('etiqueta') || searchParams.get('categoria')) {
            const timer = setTimeout(scrollToCatalogue, 150);
            return () => clearTimeout(timer);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ─── Core fetch function ────────────────────────────────────────────────────

    const fetchPage = useCallback(async (page, append) => {
        if (append) setLoadingMore(true);
        else setLoading(true);

        try {
            const { orden, direccion } = resolveOrden(ordenDisplay);

            const params = new URLSearchParams({
                categorias,
                etiquetas: etiqueta,
                marcas: 'Pandi',
                orden,
                direccion,
                pagina: page.toString(),
                stock: 'todos',
                general: '1'
            });

            const res = await fetch(`${config.obtenerProductos}?${params.toString()}`);

            if (res.ok) {
                const { productos, totalPages: tp, ultimaActualizacion: ua } = await res.json();

                if (ua && !append) {
                    try {
                        setUltimaActualizacion(new Date(ua).toLocaleString('es-EC', {
                            timeZone: 'America/Guayaquil',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }));
                    } catch (e) { console.error(e); }
                }

                if (append) {
                    setData(prev => [...prev, ...productos]);
                } else {
                    setData(productos);
                }

                setHasMore(page < tp);
                currentPageRef.current = page;
            } else if (res.status === 404) {
                if (!append) setData([]);
                setHasMore(false);
            }
        } catch (error) {
            console.error("Connection or fetch error occurred:", error);
            if (!append) setData([]);
            setHasMore(false);
        } finally {
            if (append) setLoadingMore(false);
            else setLoading(false);
        }
    }, [categorias, etiqueta, ordenDisplay]);

    // ─── Reset + initial load when filters change ───────────────────────────────

    useEffect(() => {
        currentPageRef.current = 1;
        setData([]);
        setHasMore(false);
        fetchPage(1, false);
    }, [fetchPage]); // fetchPage changes when categorias/etiqueta/ordenDisplay change

    // ─── Load next page (called by infinite scroll sentinel) ───────────────────

    const loadMore = useCallback(() => {
        if (loadingMore || loading || !hasMore) return;
        fetchPage(currentPageRef.current + 1, true);
    }, [loadingMore, loading, hasMore, fetchPage]);

    // ────────────────────────────────────────────────────────────────────────────

    return (
        <>
            <TopBar />

            <div className="w-full bg-catalogo min-h-screen px-4 pt-[110px] md:pt-[125px] pb-2">
                <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-10">

                    <section id="landing" className="mx-auto w-full flex flex-col gap-6 md:gap-10 md:flex-row">
                        <div className="flex flex-col items-center justify-center w-full md:w-1/3">
                            <h2 className="text-2xl font-black text-mainColor text-center mb-6">
                                Material para oficina y papelería de Pandi
                            </h2>
                            <p className="text-gray-500 text-center mb-6">
                                Explora las categorías Pandi y su catálogo en: micas, microminas, laminas de acetato y más.
                            </p>
                        </div>

                        <LandingGrid onSelectCategory={handleCategorySelect} />
                    </section>

                    <section
                        id="catalogo"
                        ref={catalogueRef}
                        className="scroll-mt-[110px] md:scroll-mt-[125px] flex flex-col gap-6"
                    >
                        <FiltroSuperior
                            ultimaActualizacion={ultimaActualizacion}
                            ordenDisplay={ordenDisplay}
                            setOrdenDisplay={setOrdenDisplay}
                        />

                        {/* Horizontal Tag Filter Bar */}
                        <FiltroEtiquetas
                            etiquetaDis={etiqueta}
                            setEtiqueta={(val) => {
                                setEtiqueta(val);
                            }}
                        />

                        {/* Products Content — infinite scroll */}
                        <Cuerpo
                            data={data}
                            loading={loading}
                            loadingMore={loadingMore}
                            hasMore={hasMore}
                            loadMore={loadMore}
                        />

                    </section>

                </div>
            </div>

            <WhatsAppButton />
        </>
    );
}
