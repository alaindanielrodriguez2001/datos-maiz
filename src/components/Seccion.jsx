import React from 'react'

const Seccion = ({ content, title }) => {
    return (
        <div>

            <div className="mt-10 space-y-6 px-4">

                <h1 className="text-6xl text-center text-maiz-dark mb-10">
                    {title}
                </h1>

                {content}

            </div>
        </div>
    )
}

export default Seccion;