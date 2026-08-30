"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

export const AppContext = createContext(null);

export default function AppContextProvider({ children }) {
    const [tipoPantalla, setTipoPantalla] = useState('desktop');
    
    // Filters and Pagination
    const [categoriasActivas, setcategoriasActivas] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [etiquetas, setEtiquetas] = useState([]);
    const [resetBusqueda, setResetBusqueda] = useState(false);
    const [pagina, setPagina] = useState(1);

    // Initial setup
    useEffect(() => {
        // Add resize listener for screen size breakpoint (768px)
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setTipoPantalla('mobile');
            } else {
                setTipoPantalla('desktop');
            }
        };

        handleResize(); // trigger initially
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const globalState = {
        tipoPantalla: { tipoPantalla, setTipoPantalla },
        categoriasActivas: { categoriasActivas, setcategoriasActivas },
        marcas: { marcas, setMarcas },
        etiquetas: { etiquetas, setEtiquetas },
        resetBusqueda: { resetBusqueda, setResetBusqueda },
        pagina: { pagina, setPagina }
    };

    return (
        <AppContext.Provider value={{ ...globalState }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
}
