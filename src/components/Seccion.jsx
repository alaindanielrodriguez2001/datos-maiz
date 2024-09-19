import React from 'react'

const Seccion = ({ content, title }) => {
    return (
        <div>
            <hr className="border border-maiz-dark my-5 px-4" />

            <div className="my-12 space-y-6 px-4">

                <h1 className="text-6xl text-center text-maiz-dark mb-10">
                    {title}
                </h1>

                {content}

            </div>
        </div>
    )
}

export default Seccion;