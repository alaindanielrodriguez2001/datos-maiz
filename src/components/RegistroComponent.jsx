'use client'
import React, { useState, useEffect } from 'react';
import TableSelector from './TableSelector';
import Table from './Table';
import Statistics from './Statistics';
import InputForm from './InputForm';
import { fetchData, postData } from '../services/api';

const RegistroComponent = () => {
  const [estacionSeleccionada, setEstacionSeleccionada] = useState(0);
  const [data, setData] = useState([]);

  const formattedColumns = [
    { title: 'Estación' },
    { title: 'Fecha' },
    { title: 'Temperaturas', subColumns: ['Mínima °C', 'Media °C', 'Máxima °C'] },
    { title: 'Humedad relativa', subColumns: ['Mínima %', 'Media %', 'Máxima %', 'Horas > 90%'] },
    { title: 'Período de HR ≥ 90%', subColumns: ['Mínima °C', 'Media °C', 'Máxima °C'] },
    { title: 'Precipitación mm' },
    { title: 'Velocidad del viento (m seg-1)' }
  ];
  const columns = ['estacion_codigo', 'fecha', 'temperatura_maxima', 'temperatura_minima', 'temperatura_media', 'humedad_maxima', 'humedad_minima', 'humedad_media', 'horas_hr_mayor_que_90', 'hr_mayor_que_90_max', 'hr_mayor_que_90_min', 'hr_mayor_que_90_med', 'precipitacion', 'velocidad_del_viento'];

  const rutaRegistrosEstacionSeleccionada = `registros_estacion/${estacionSeleccionada}`;
  const rutaOpciones = 'estaciones/';

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await fetchData(rutaRegistrosEstacionSeleccionada);
      setData(result);
    };
    fetchDataAsync();
  }, [rutaRegistrosEstacionSeleccionada]);

  return (
    <div>
      <TableSelector
        rutaOpciones={rutaOpciones}
        onEstacionChange={setEstacionSeleccionada}
        onFetchData={async () => {
          const result = await fetchData(rutaRegistrosEstacionSeleccionada);
          setData(result);
        }}
      />

      <Table
        columns={columns}
        formattedColumns={formattedColumns}
        data={data}
        deleteUrl={'registro'}
        onFetchData={async () => {
          const result = await fetchData(rutaRegistrosEstacionSeleccionada);
          setData(result);
        }}
        compositeHeader={true}
      />

      <InputForm
        formFields={[
          { name: 'estacion', type: 'select', placeholder: 'Seleccione una estación' },
          { name: 'fecha', type: 'date', placeholder: 'Fecha' },
          { name: 'temperatura_maxima', type: 'number', placeholder: 'Temperatura máxima °C' },
          { name: 'temperatura_minima', type: 'number', placeholder: 'Temperatura mínima °C' },
          { name: 'temperatura_media', type: 'number', placeholder: 'Temperatura media °C' },
          { name: 'humedad_maxima', type: 'number', placeholder: 'Humedad relativa máxima' },
          { name: 'humedad_minima', type: 'number', placeholder: 'Humedad relativa mínima' },
          { name: 'humedad_media', type: 'number', placeholder: 'Humedad relativa media' },
          { name: 'horas_hr_mayor_que_90', type: 'number', placeholder: 'Horas HR ≥ 90 %' },
          { name: 'hr_mayor_que_90_max', type: 'number', placeholder: 'Máxima °C' },
          { name: 'hr_mayor_que_90_min', type: 'number', placeholder: 'Mínima °C' },
          { name: 'hr_mayor_que_90_med', type: 'number', placeholder: 'Media °C' },
          { name: 'precipitacion', type: 'number', placeholder: 'Precipitación' },
          { name: 'velocidad_del_viento', type: 'number', placeholder: 'Velocidad del viento' },
        ]}
        fetchUrls={[
          { name: 'estacion', url: 'estaciones/' },
        ]}
        postUrl={'registros/'}
        buttonText="Introducir un nuevo registro"
        onFormSubmit={async () => {
          const result = await fetchData(rutaRegistrosEstacionSeleccionada);
          setData(result);
        }}
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

export default RegistroComponent;
