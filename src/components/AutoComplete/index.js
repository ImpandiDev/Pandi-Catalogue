import React, { useEffect, useState } from 'react';

function Autocomplete({ baseData, setRenderMarcas, placeholder }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        if (value.length > 0) {
            const filteredSuggestions = baseData.filter(element => {
                // Support either name property
                const nameToMatch = element.nombreUnicode || element.nombre || '';
                return nameToMatch.toLowerCase().includes(value.toLowerCase());
            });
            setRenderMarcas(filteredSuggestions);
        } else {
            setRenderMarcas(baseData);
        }
    };

    useEffect(() => {
        if (inputValue === '' || inputValue === null || inputValue === undefined) {
            setRenderMarcas(baseData);
        }
    }, [inputValue, baseData, setRenderMarcas]);

    return (
        <div className="relative w-full max-w-[300px] mb-2">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                aria-autocomplete="list"
                className="w-full px-3 py-1.5 h-[36px] border border-gray-400 bg-white text-dark rounded-md outline-none text-xs md:text-sm focus:border-mainColor transition-colors"
                placeholder={placeholder}
            />
        </div>
    );
}

export default Autocomplete;
