'use client'
import React, { useState, useEffect } from 'react';
import TableSelector from './TableSelector';
import Table from './Table';
import Statistics from './Statistics';
import axios from 'axios';

const MainComponent = () => {
  const [selectedCampo, setSelectedCampo] = useState(0);
  const [data, setData] = useState([]);

  const fetchData = async (campo) => {
    console.log(`Fetching data for campo: ${campo}`);
    try {
      const campoUrl = `${process.env.NEXT_PUBLIC_API_URL}/observaciones_campo/${campo}/`;
      const response = await axios.get(campoUrl);
      console.log('Data fetched:', response.data);
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData(selectedCampo);
  }, [selectedCampo]);

  useEffect(() => {
    console.log('Data state updated:', data);
  }, [data]);

  return (
    <div>
      <TableSelector onCampoChange={setSelectedCampo} onFetchData={fetchData} />
      <Table
        columns={['nombre_del_campo', 'fecha', 'fase_fenologica', 'humedad_maxima', 'humedad_minima', 'humedad_media', 'temperatura_maxima', 'temperatura_minima', 'temperatura_media', 'precipitacion', 'presencia_del_hongo']}
        formattedColumns={['Campo', 'Fecha', 'Fase fenológica', 'Humedad máxima', 'Humedad mínima', 'Humedad media', 'Temperatura máxima', 'Temperatura mínima', 'Temperatura media', 'Precipitación', 'Presencia del hongo']}
        data={data}
        deleteUrl={`${process.env.NEXT_PUBLIC_API_URL}/observaciones`}
      />
      <div className="flex flex-col px-4 text-maiz mb-10">
        <div className="container flex flex-col">
          <hr className="border border-maiz-dark my-5 " />
          <Statistics data={data} />
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
