"use client";
import React, { memo } from 'react';
import { SortAscending } from '@phosphor-icons/react';

const FiltroSuperior = ({
    ultimaActualizacion,
    ordenDisplay, setOrdenDisplay
}) => {

    return (
        <div className="w-full bg-white border border-gray-100 rounded-xl shadow-sm p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            {/* Left side: title & update date */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-8">
                <h2 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">
                    Catálogo Pandi
                </h2>
            </div>

            {/* Right side: sort selector */}
            <div className="flex items-stretch sm:items-center gap-3">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 flex-grow sm:flex-grow-0">
                    <SortAscending size={18} className="text-gray-400 mr-2" />
                    <label htmlFor="ordenadoPor" className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-wider mr-2 whitespace-nowrap hidden lg:inline">
                        Orden:
                    </label>
                    <select
                        id="ordenadoPor"
                        value={ordenDisplay}
                        onChange={(e) => setOrdenDisplay(e.target.value)}
                        className="bg-transparent border-none text-xs md:text-sm font-bold text-dark outline-none cursor-pointer w-full"
                    >
                        <option value="popularidad">Más vendidos</option>
                        <option value="codigo">Por código</option>
                        <option value="nombreAsc">Nombre (A a Z)</option>
                        <option value="nombreDesc">Nombre (Z a A)</option>
                        <option value="precioAsc">Precio más bajo</option>
                        <option value="precioDesc">Precio más alto</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default memo(FiltroSuperior);
