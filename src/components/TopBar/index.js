"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { List, X } from '@phosphor-icons/react';

const TopBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="glassmorphism-nav fixed top-0 left-0 w-full h-[85px] z-40 transition-all duration-300 flex items-center px-4 md:px-12 justify-between">
            {/* Left Side: Pandi Logo */}
            <div className="flex items-center">
                <Link href="/#landing" className="flex flex-col items-center hover:opacity-90 transition-opacity -mt-5">
                    <Image
                        src="/images/Providers/Products brands/pandi.png"
                        alt="Catálogo Pandi"
                        className="h-12 md:h-[82px] w-auto object-contain"
                        width={250}
                        height={82}
                    />
                    <span className="text-[10px] md:text-[11px] font-black tracking-[0.25em] uppercase text-[#93363B] md:-mt-3 leading-none">
                        Ecuador
                    </span>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
                <Link href="/#landing" className="text-sm font-bold text-dark hover:text-mainColor transition-colors uppercase tracking-wider">
                    Inicio
                </Link>
                <a href="https://www.impandi.com" className="text-sm font-bold text-dark hover:text-mainColor transition-colors uppercase tracking-wider">
                    Empresa
                </a>
                <Link href="/#catalogo" className="text-sm font-bold text-dark hover:text-mainColor transition-colors uppercase tracking-wider">
                    Productos
                </Link>
                <a href="https://www.impandi.com/contactenos" className="text-sm font-bold text-dark hover:text-mainColor transition-colors uppercase tracking-wider">
                    Contáctanos
                </a>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
                className="md:hidden text-dark hover:text-mainColor transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X size={28} /> : <List size={28} />}
            </button>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="absolute top-[85px] left-0 w-full bg-white shadow-lg border-t border-gray-100 flex flex-col items-center py-4 gap-4 md:hidden">
                    <Link href="/#landing" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold text-dark hover:text-mainColor transition-colors uppercase tracking-wider">
                        Inicio
                    </Link>
                    <a href="https://www.impandi.com" className="text-sm font-bold text-dark hover:text-mainColor transition-colors uppercase tracking-wider">
                        Empresa
                    </a>
                    <Link href="/#catalogo" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold text-dark hover:text-mainColor transition-colors uppercase tracking-wider">
                        Productos
                    </Link>
                    <a href="https://www.impandi.com/contactenos" className="text-sm font-bold text-dark hover:text-mainColor transition-colors uppercase tracking-wider">
                        Contáctanos
                    </a>
                </div>
            )}
        </header>
    );
};

export default TopBar;
