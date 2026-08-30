"use client";
import React, { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import { getProductHref } from '@/utils/slugGenerator';
import config from '../../../../public/config';
import Loader from '@/components/Loader';
import { ShoppingCart } from '@phosphor-icons/react';

const Producto = (props) => {
    const [imageReady, setImageReady] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        const handlePageShow = () => {
            setIsNavigating(false);
        };
        window.addEventListener('pageshow', handlePageShow);
        return () => {
            window.removeEventListener('pageshow', handlePageShow);
        };
    }, []);

    const productHref = `https://www.impandi.com${getProductHref(props.codigoAux, props.nombre)}`;

    const handleProductClick = (e) => {
        e.preventDefault();
        setIsNavigating(true);
        // Small delay to let loader show before redirecting
        setTimeout(() => {
            window.location.href = productHref;
        }, 150);
    };

    return (
        <div
            onClick={handleProductClick}
            className="group relative w-full bg-white border border-gray-100 shadow-md hover:shadow-xl rounded-xl duration-300 hover:scale-[1.03] flex flex-col justify-between h-[300px] sm:h-[350px] md:h-[360px] overflow-hidden cursor-pointer"
        >
            {/* Navigating Loader Overlay */}
            {isNavigating && (
                <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center z-20 backdrop-blur-xs transition-opacity duration-300">
                    <div className="flex flex-col items-center gap-3 p-4">
                        <Loader />
                        <p className="text-xs md:text-sm font-bold text-gray-700 mt-2 text-center animate-pulse">
                            Redirigiendo a IMPANDI...
                        </p>
                    </div>
                </div>
            )}

            {/* Product Image */}
            <div className="relative w-full h-[160px] sm:h-[200px] md:h-[240px] bg-white flex items-center justify-center p-3 md:p-4 overflow-hidden border-b border-gray-100">
                {!imageReady && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader />
                    </div>
                )}
                <Image
                    src={props.img || config.isoTipo}
                    alt={props.nombre}
                    className={`w-full h-full object-contain scale-[1.667] rounded-t-xl duration-500 group-hover:scale-[1.75] ${imageReady ? 'opacity-100' : 'opacity-0'
                        }`}
                    width={260}
                    height={260}
                    onLoad={() => setImageReady(true)}
                />
            </div>

            {/* Info Content */}
            <div className="p-3 md:p-4 flex flex-col justify-between flex-grow text-left">
                <div>
                    <h4 className="line-clamp-3 text-xs md:text-sm font-black text-gray-800 tracking-tight leading-snug mt-1 group-hover:text-mainColor transition-colors">
                        {props.nombre}
                    </h4>
                </div>

                {/* Bottom Redirection Button */}
                <div className="flex items-center justify-center gap-1.5 py-1.5 px-3 bg-dark text-white text-[11px] md:text-xs rounded-lg group-hover:bg-mainColor transition-colors duration-300 font-bold uppercase tracking-wider">
                    Comprar
                    <ShoppingCart size={14} weight="fill" color="white" />
                </div>
            </div>
        </div>
    );
};

export default memo(Producto);
