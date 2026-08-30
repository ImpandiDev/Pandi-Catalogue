import Link from 'next/link';
import React from 'react';

const LinkButton = ({ text, href, download, reverse, onClick }) => {
    const classStr = reverse
        ? 'inline-block text-white bg-dark px-3 py-[4px] text-[15px] md:text-base md:px-4 md:py-2 text-center rounded-md hover:bg-mainColor hover:text-white transition duration-200 ease-in-out cursor-pointer'
        : 'inline-block text-white bg-mainColor px-3 py-[4px] text-[15px] md:text-base md:px-4 md:py-2 text-center rounded-md hover:bg-dark hover:text-white transition duration-200 ease-in-out cursor-pointer';

    return (
        <>
            {download !== undefined ? (
                <a download href={href} className={classStr} onClick={onClick}>
                    {text}
                </a>
            ) : (
                <Link href={href} className={classStr} onClick={onClick}>
                    {text}
                </Link>
            )}
        </>
    );
};

export default LinkButton;
