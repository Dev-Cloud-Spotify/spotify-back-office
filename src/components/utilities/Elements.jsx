import React from 'react';

export const RoundedBoutton = ({handleClick, text, className, disabled}) => {
    return (
        <button className={`w-full py-3 text-black font-bold text-xl rounded-full ${className}`}  onClick={handleClick} disabled={disabled}>
            {text}
        </button>
    );
}

