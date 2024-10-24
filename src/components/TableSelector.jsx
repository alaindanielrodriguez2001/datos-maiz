'use client'
import React, { useState, useEffect } from "react";
import { fetchData } from "@/services/api";

const TableSelector = ({ rutaOpciones, onOpcionChange, onYearChange}) => {
  const [opcionesData, setOpcionesData] = useState([]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(0);
  const [yearSeleccionado, setYearSeleccionado] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchOptions = async () => {
      const data = await fetchData(rutaOpciones);
      setOpcionesData(data || []);
    };
    fetchOptions();
  }, [rutaOpciones]);

  const handleOpcionChange = (e) => {
    const opcionSeleccionadaId = parseInt(e.target.value, 10);
    setOpcionSeleccionada(opcionSeleccionadaId);
    onOpcionChange(opcionSeleccionadaId);
  };

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value, 10);
    setYearSeleccionado(year);
    onYearChange(year);
  };

  return (
    <div className="mx-10 rounded-xl">
      <p className="w-full text-lg text-maiz text-center">
        Seleccione la estación meteorológica y el año
      </p>
      <div className="flex flex-col left-0 justify-center mt-3 mb-3 mx-10 space-y-3 rounded-xl">
        <select
          value={opcionSeleccionada}
          onChange={handleOpcionChange}
          className="w-full p-2 border-2 border-maiz rounded-xl"
        >
          <option value={0}>Todas</option>
          {Array.isArray(opcionesData) && opcionesData.map((opcion) => (
            <option key={opcion.id} value={opcion.id}>{opcion.nombre}</option>
          ))}
        </select>
        <select
          value={yearSeleccionado}
          onChange={handleYearChange}
          className="w-full p-2 border-2 border-maiz rounded-xl"
        >
          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TableSelector;
