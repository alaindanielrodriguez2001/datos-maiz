'use client'
import React, { useState, useEffect } from "react";
import CustomButton from "./CustomButton";

const TableSelector = ({ onEstacionChange, onFetchData }) => {
  const [estacionesData, setEstacionesData] = useState([]);
  const [estacionSeleccionada, setEstacionSeleccionada] = useState(0);
  
  const fetchEstaciones = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/estaciones/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching estaciones:', error);
        throw error;
    }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const estaciones = await fetchEstaciones();
        setEstacionesData(estaciones);
      } catch (error) {
        console.error('Error fetching estaciones:', error);
      }
    };
    fetchData();
  }, []);

  const handleEstacionChange = (e) => {
    const estacionSeleccionadaId = parseInt(e.target.value, 10);
    setEstacionSeleccionada(estacionSeleccionadaId);
    onEstacionChange(estacionSeleccionadaId);
    onFetchData(estacionSeleccionadaId); 
  };

  return (
    <div className="mx-10 rounded-xl">
      <p className="w-full text-lg text-maiz text-center">
        Seleccione la estación meteorológica
      </p>
      <div className="flex flex-col left-0 justify-center mt-3 mb-3 mx-10 space-y-3 rounded-xl">
        <select
          value={estacionSeleccionada}
          onChange={handleEstacionChange}
          className="w-full p-2 border border-maiz rounded-xl"
        >
          <option value={0}>Todas</option>
          {estacionesData.map((estacion) => (
            <option key={estacion.id} value={estacion.id}>{estacion.nombre}</option>
          ))}
        </select>
      </div>


      {/* <div className="flex left-0 justify-between mt-7 mb-3 mx-10 space-x-5">
        <CustomButton
          onClick={handleLatestClick}
          content="Todos los registros"
          customStyle="w-full"
        />
        <CustomButton
          content="Seleccionar período"
          customStyle="w-full"
        />
      </div> */}

    </div>
  );
};

export default TableSelector;
