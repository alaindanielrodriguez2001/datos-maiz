import React from 'react'

const PageHeader = ({ title, imagesrc, content }) => {
    return (
        <div>
            <div className="flex flex-col justify-center w-full mt-24 mb-8 space-y-10 px-10">

                <h1 className="text-6xl text-center text-maiz-dark">
                    {title}
                </h1>

                {imagesrc && (
                    <div className="flex w-full justify-center">
                    <img
                        src={imagesrc}
                        alt='someimage'
                        className="my-7 h-[90px] w-[90px]"
                    />
                </div>
                )}

                <div className="text-3xl text-center text-maiz">
                    {content}
                </div>
            </div>
        </div>
    )
}

export default PageHeader;