import React from 'react';

const Button = ({ text, onClick, type, activeByDefault }) => {
    return (
        <button
            type={type !== undefined && type !== null ? type : "button"}
            onClick={onClick}
            className={`relative rounded-md px-3 py-1 md:px-4 md:py-2 text-white transition-all duration-200 cursor-pointer font-bold leading-normal text-sm md:text-base ${
                activeByDefault ? 'bg-mainColor hover:bg-dark' : 'bg-dark hover:bg-mainColor'
            }`}
        >
            {text}
        </button>
    );
};

export default Button;
