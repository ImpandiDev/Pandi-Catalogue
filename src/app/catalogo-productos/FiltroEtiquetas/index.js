"use client";
import React, { memo, useEffect, useState } from "react";
import { Tag, X } from "@phosphor-icons/react";
import { useAppContext } from "@/context";
import { getEtiquetasForFilter } from "@/data/landingItems";

const ETIQUETAS_FILTER = getEtiquetasForFilter();

const FiltroEtiquetas = ({ etiquetaDis, setEtiqueta }) => {
    const { resetBusqueda, setResetBusqueda } = useAppContext().resetBusqueda;
    const [tagIndex, setTagIndex] = useState(0);

    // Handle filter clearing from context
    useEffect(() => {
        if (resetBusqueda) {
            setEtiqueta(null);
            setResetBusqueda(false);
        }
    }, [resetBusqueda, setEtiqueta, setResetBusqueda]);

    const handleTagToggle = (tagNombre) => {
        if (!etiquetaDis) {
            setEtiqueta(tagNombre);
            return;
        }

        const items = etiquetaDis.split(",");
        if (items.includes(tagNombre)) {
            const newTags = items.filter((item) => item !== tagNombre).join(",");
            setEtiqueta(newTags || null);
        } else {
            setEtiqueta([...items, tagNombre].join(","));
        }
    };

    const handleClearAll = () => {
        setEtiqueta(null);
    };

    const activeTagsCount = etiquetaDis
        ? etiquetaDis.split(",").filter(Boolean).length
        : 0;

    return (
        <div className="w-full bg-white border border-gray-100 rounded-xl shadow-sm px-4 py-3 flex flex-col gap-2.5">
            {/* Header row */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <Tag size={16} weight="bold" className="text-mainColor flex-shrink-0" />
                    <span className="text-xs font-black text-gray-500 uppercase tracking-wider">
                        Filtrar por etiqueta
                    </span>
                    {activeTagsCount > 0 && (
                        <span className="ml-1 bg-mainColor text-white text-[10px] font-black rounded-full px-1.5 py-0.5 leading-none">
                            {activeTagsCount}
                        </span>
                    )}
                </div>

                {/* Clear button - only visible when at least one tag is active */}
                {activeTagsCount > 0 && (
                    <button
                        onClick={handleClearAll}
                        className="flex items-center gap-1 text-[11px] font-bold text-gray-400 hover:text-mainColor transition-colors duration-200"
                    >
                        <X size={12} weight="bold" />
                        Limpiar
                    </button>
                )}
            </div>

            {/* Tags row wraps naturally into multiple rows */}
            <div className="flex flex-wrap gap-2">
                {ETIQUETAS_FILTER.slice(tagIndex, tagIndex + 20).map((tag) => {
                    const isActive =
                        etiquetaDis &&
                        etiquetaDis.split(",").includes(tag.nombre);

                    return (
                        <button
                            key={tag.codigo}
                            onClick={() => handleTagToggle(tag.nombre)}
                            className={`
                                inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold
                                border transition-all duration-200 cursor-pointer select-none
                                ${isActive
                                    ? "bg-mainColor border-mainColor text-white shadow-sm scale-[1.02]"
                                    : "bg-gray-50 border-gray-200 text-gray-600 hover:border-mainColor hover:text-mainColor hover:bg-red-50"
                                }
                            `}
                        >
                            {isActive && (
                                <X size={10} weight="bold" className="opacity-80" />
                            )}
                            {tag.nombre}
                        </button>
                    );
                })}
            </div>
            
            <div className="flex justify-between items-center mt-1 px-1">
                {tagIndex > 0 ? (
                    <button 
                        onClick={() => setTagIndex(Math.max(0, tagIndex - 10))}
                        className="text-xs font-bold text-gray-500 hover:text-mainColor transition-colors"
                    >
                        &larr; Ver menos
                    </button>
                ) : <div></div>}
                
                {tagIndex + 20 < ETIQUETAS_FILTER.length && (
                    <button 
                        onClick={() => setTagIndex(tagIndex + 10)}
                        className="text-xs font-bold text-mainColor hover:text-[#93363B] transition-colors"
                    >
                        Ver más &rarr;
                    </button>
                )}
            </div>
        </div>
    );
};

export default memo(FiltroEtiquetas);
