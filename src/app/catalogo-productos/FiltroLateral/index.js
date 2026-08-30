"use client";
import React, { useState, useEffect, memo } from "react";
import { CaretDown, Tag, Trash } from '@phosphor-icons/react';
import Autocomplete from "@/components/AutoComplete";
import { useAppContext } from "@/context";
import { getEtiquetasForFilter } from "@/data/landingItems";

const ETIQUETAS_FILTER = getEtiquetasForFilter();

const FiltroLateral = ({ mostrarWrapperFiltros, tipoPantalla, etiquetaDis, setEtiqueta }) => {
    const { resetBusqueda, setResetBusqueda } = useAppContext().resetBusqueda;

    const [showEtiquetas, setShowEtiquetas] = useState(true);

    const [allTags] = useState(ETIQUETAS_FILTER);
    const [renderTags, setRenderTags] = useState(ETIQUETAS_FILTER);
    const [tagIndex, setTagIndex] = useState(0);

    // Reset tag index when search filters tags
    useEffect(() => {
        setTagIndex(0);
    }, [renderTags]);

    // Initial responsive setup
    useEffect(() => {
        if (tipoPantalla === 'desktop') {
            setShowEtiquetas(true);
        } else {
            setShowEtiquetas(false);
        }
    }, [tipoPantalla]);

    // Handle filter clearing
    useEffect(() => {
        if (resetBusqueda) {
            setEtiqueta(null);
            setResetBusqueda(false);
        }
    }, [resetBusqueda, setEtiqueta, setResetBusqueda]);

    const handleTagChange = (tag) => {
        if (!etiquetaDis) {
            setEtiqueta(tag);
            return;
        }

        const items = etiquetaDis.split(',');
        if (items.includes(tag)) {
            const newTags = items.filter(item => item !== tag).join(',');
            setEtiqueta(newTags || null);
        } else {
            setEtiqueta([...items, tag].join(','));
        }
    };

    // Responsive classes
    const displayClass = tipoPantalla === 'desktop'
        ? 'block'
        : mostrarWrapperFiltros ? 'block w-full bg-white border border-gray-100 rounded-xl shadow-lg p-5 z-20 animate-fade-in' : 'hidden';

    return (
        <aside className={`${displayClass} md:w-full flex flex-col gap-5 text-left`}>
            
            {/* TAGS SECTION */}
            <div className="border-b border-gray-100 pb-4">
                <button
                    onClick={() => setShowEtiquetas(!showEtiquetas)}
                    className="w-full font-black text-sm md:text-base text-gray-700 flex items-center justify-between py-1.5 focus:outline-none"
                >
                    <div className="flex items-center gap-2">
                        <Tag size={20} className="text-mainColor" />
                        <span>Etiquetas</span>
                    </div>
                    <CaretDown
                        size={16}
                        className={`text-gray-400 transition-transform duration-300 ${showEtiquetas ? 'rotate-180' : 'rotate-0'}`}
                    />
                </button>

                {showEtiquetas && (
                    <div className="flex flex-col gap-2 mt-3 pl-7">
                        <Autocomplete
                            baseData={allTags}
                            setRenderMarcas={setRenderTags}
                            placeholder="Buscar etiqueta..."
                        />
                        <div className="flex flex-col gap-2 mt-2 max-h-[220px] overflow-y-auto pr-1">
                            {renderTags.slice(tagIndex, tagIndex + 20).map((tag, index) => {
                                const isChecked = etiquetaDis && etiquetaDis.split(',').includes(tag.nombre);
                                return (
                                    <label key={index} className="flex items-center gap-2.5 text-xs md:text-sm text-dark font-medium cursor-pointer hover:text-mainColor transition-colors py-0.5">
                                        <input
                                            type="checkbox"
                                            checked={!!isChecked}
                                            onChange={() => handleTagChange(tag.nombre)}
                                            className="h-4 w-4 rounded border-gray-300 text-mainColor focus:ring-mainColor focus:ring-offset-0 cursor-pointer accent-mainColor"
                                        />
                                        <span>{tag.nombre}</span>
                                    </label>
                                );
                            })}
                        </div>
                        <div className="flex justify-between items-center mt-2 px-1">
                            {tagIndex > 0 ? (
                                <button 
                                    onClick={() => setTagIndex(Math.max(0, tagIndex - 10))}
                                    className="text-xs font-bold text-gray-500 hover:text-mainColor transition-colors"
                                >
                                    &larr; Ver menos
                                </button>
                            ) : <div></div>}
                            
                            {tagIndex + 20 < renderTags.length && (
                                <button 
                                    onClick={() => setTagIndex(tagIndex + 10)}
                                    className="text-xs font-bold text-mainColor hover:text-[#93363B] transition-colors"
                                >
                                    Ver más &rarr;
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* CLEAR BUTTON */}
            <button
                onClick={() => setResetBusqueda(true)}
                className="w-full flex items-center justify-center gap-2 py-2 border border-gray-200 bg-gray-50 hover:bg-mainColor hover:text-white text-dark rounded-lg font-bold text-xs md:text-sm transition-all duration-300 shadow-xs"
            >
                <Trash size={16} />
                Limpiar Filtros
            </button>
        </aside>
    );
};

export default memo(FiltroLateral);
