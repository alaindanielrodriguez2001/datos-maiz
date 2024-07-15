'use client'
import React, { useState } from "react";
import Filters from "./Filters";

import CustomButton from "./CustomButton";
import FiltersItem from "./FiltersItem";

const TableSelector = () => {
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    const handleLatestClick = () => {
        console.log("Latest instances");
        setShowFilterMenu(false);
    };

    const handleFilterClick = () => {
        setShowFilterMenu(!showFilterMenu);
    };

    return (
        <div className="mx-10">

            <div className="flex flex-col left-0 justify-center mt-7 mb-3 mx-10 space-y-3">

                <CustomButton
                    content="Seleccionar campo de cultivo"
                    customStyle="w-full"
                />

                <FiltersItem content="Campo de cultivo: *********"/>


            </div>

            <div className="flex left-0 justify-between mt-7 mb-3 mx-10 space-x-5">
                <CustomButton
                    onClick={handleLatestClick}
                    content="Siete últimos registros"
                    customStyle="w-full"
                />

                <CustomButton
                    onClick={handleFilterClick}
                    content="Filtrar registros"
                    customStyle="w-full"
                />

            </div>

            {showFilterMenu && (
                <>
                    <Filters />
                </>
            )}


        </div>
    )
}

export default TableSelector