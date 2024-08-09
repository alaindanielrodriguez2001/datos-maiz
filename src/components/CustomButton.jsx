import React from 'react'

const CustomButton = ({ content, customStyle, onClick, is_disabled }) => {
    return (
        <button 
            onClick={onClick}
            className={`rounded-xl bg-maiz hover:bg-maiz-dark border-maiz-border border-2 transition cursor-pointer justify-center text-white py-1 px-4 ${customStyle}`}
        >
            {content}
        </button>
    )
}

export default CustomButton