import React from 'react';

const InfoCard = ({imagesrc, title, text}) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 rounded-xl border border-maiz p-5 max-h-150">

                <div className="container col-span-1 aspect-square overflow-hidden rounded-xl border border-maiz-dark">
                    <img
                        src={imagesrc}
                        alt="Imagen"
                        width="1000"
                        height="1000"
                        className="relative h-full w-full"
                    />
                </div>

                <div className="col-span-1 md:col-span-2 justify-center mx-10 mt-6 h-full">

                    <p className="text-5xl text-center text-maiz-dark mb-10">
                        {title}
                    </p>

                    <p className="text-justify text-maiz text-lg md:text-2xl mt-4">
                        {text}
                    </p>

                </div>

            </div>
        </div>
    )
}

export default InfoCard