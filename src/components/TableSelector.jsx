'use client'
import React, { useState, useEffect } from "react";
import { fetchCampos } from '../services/api';
import CustomButton from "./CustomButton";

const TableSelector = ({ onCampoChange, onFetchData }) => {
  const [camposData, setCamposData] = useState([]);
  const [selectedCampo, setSelectedCampo] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campos = await fetchCampos();
        setCamposData(campos);
      } catch (error) {
        console.error('Error fetching campos:', error);
      }
    };
    fetchData();
  }, []);

  const handleCampoChange = (e) => {
    const selectedCampoId = e.target.value === "0" ? 0 : parseInt(e.target.value, 10);
    setSelectedCampo(selectedCampoId);
    onCampoChange(selectedCampoId);
    onFetchData(selectedCampoId); 
  };

  const handleLatestClick = () => {
    console.log("Latest instances");
  };

  return (
    <div className="mx-10 rounded-xl">
      <p className="w-full text-lg text-maiz text-center">
        Seleccione el campo de cultivo
      </p>
      <div className="flex flex-col left-0 justify-center mt-3 mb-3 mx-10 space-y-3 rounded-xl">
        <select
          value={selectedCampo}
          onChange={handleCampoChange}
          className="w-full p-2 border border-maiz rounded-xl"
        >
          <option value={0}>Todos</option>
          {camposData.map((campo) => (
            <option key={campo.id} value={campo.id}>{campo.nombre_del_campo}</option>
          ))}
        </select>
      </div>
      <div className="flex left-0 justify-between mt-7 mb-3 mx-10 space-x-5">
        <CustomButton
          onClick={handleLatestClick}
          content="Todos los registros"
          customStyle="w-full"
        />
        <CustomButton
          content="Seleccionar período"
          customStyle="w-full"
        />
      </div>

    </div>
  );
};

export default TableSelector;
