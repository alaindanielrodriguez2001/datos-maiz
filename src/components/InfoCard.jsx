import React from 'react';

const InfoCard = ({ imagesrc, title, text }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 rounded-xl border-2 border-maiz p-5 max-h-150">

            <div className="container col-span-1 aspect-square overflow-hidden rounded-xl">
                <img
                    src={imagesrc}
                    alt="Imagen"
                    width="500"
                    height="500"
                    className="relative h-full w-full"
                />
            </div>

            <div className="col-span-1 md:col-span-3 mx-10 mt-2 h-full">
                {title && (
                    <div className="text-5xl text-center text-maiz-dark mb-5">
                        {title}
                    </div>
                )}

                <div className="text-center items-center text-gray-500 text-lg md:text-2xl">
                    <div>
                        {text}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default InfoCard