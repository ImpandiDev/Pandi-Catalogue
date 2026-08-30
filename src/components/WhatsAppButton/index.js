"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import config from '../../../public/config';

const WhatsAppButton = () => {
    const [showExtraInfo, setShowExtraInfo] = useState(false);

    const handleWhatsAppClick = () => {
        const phoneNumber = config.whatsappNumber;
        const message = config.whatsappMessage;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <button
            onClick={handleWhatsAppClick}
            onMouseEnter={() => setShowExtraInfo(true)}
            onMouseLeave={() => setShowExtraInfo(false)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-2 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group"
            style={{ boxShadow: '0 8px 30px rgba(37, 211, 102, 0.4)' }}
            aria-label="Contactar por WhatsApp"
        >
            <Image
                src="/images/Social/whatsapp.png"
                alt="WhatsApp Logo"
                className="h-10 w-10 md:h-12 md:w-12 object-contain"
                width={48}
                height={48}
            />
            <span
                className={`text-xs md:text-sm font-bold bg-dark text-white py-1.5 px-3 rounded-lg absolute right-14 md:right-16 whitespace-nowrap shadow-lg transition-all duration-300 ${
                    showExtraInfo
                        ? 'opacity-100 translate-x-0 visible'
                        : 'opacity-0 translate-x-2 invisible'
                }`}
            >
                ¡Haz clic aquí y contáctanos!
            </span>
        </button>
    );
};

export default WhatsAppButton;
