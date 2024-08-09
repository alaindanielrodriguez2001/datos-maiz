'use client'
import React, { useState, useEffect } from "react";
import { fetchCampoNames } from '../services/api';
import CustomButton from "./CustomButton";
import Filters from "./Filters";

const TableSelector = ({ onCampoChange }) => {
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [campoNames, setCampoNames] = useState([]);
    const [selectedCampo, setSelectedCampo] = useState("Todos");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const names = await fetchCampoNames();
                setCampoNames(names);
            } catch (error) {
                console.error('Error fetching campo names:', error);
            }
        };
        fetchData();
    }, []);

    const handleCampoChange = (e) => {
        setSelectedCampo(e.target.value);
        onCampoChange(e.target.value);
    };

    const handleLatestClick = () => {
        console.log("Latest instances");
        setShowFilterMenu(false);
    };

    const handleFilterClick = () => {
        setShowFilterMenu(!showFilterMenu);
    };

    return (
        <div className="mx-10">
            <p className="w-full text-lg text-maiz text-center">
                Seleccione el campo de cultivo
            </p>

            <div className="flex flex-col left-0 justify-center mt-3 mb-3 mx-10 space-y-3 rounded-xl">
                <select
                    value={selectedCampo}
                    onChange={handleCampoChange}
                    className="w-full p-2 border border-maiz"
                >
                    <option value="Todos">Todos</option>
                    {campoNames.map((name) => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
            </div>

            <div className="flex left-0 justify-between mt-7 mb-3 mx-10 space-x-5">
                <CustomButton
                    onClick={handleLatestClick}
                    content="Diez últimos registros"
                    customStyle="w-full"
                />

                <CustomButton
                    onClick={handleFilterClick}
                    content="Seleccionar período"
                    customStyle="w-full"
                />
            </div>

            {showFilterMenu && (
                <>
                    <Filters />
                </>
            )}
        </div>
    );
};

export default TableSelector;
