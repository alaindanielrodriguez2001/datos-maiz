import React from 'react'
import FiltersItem from './FiltersItem';
import CustomButton from './CustomButton';

const Filters = () => {
  return (
    <div>
      <ul className="flex flex-col w-full space-y-3 mb-3">
        <FiltersItem content="Fecha" />
        <FiltersItem content="Día o noche" />
        <FiltersItem content="Lugar de cultivo" />
        <FiltersItem content="Variedad" />
        <FiltersItem content="Fase fenológica" />
        <FiltersItem content="Humedad relativa" />
        <FiltersItem content="Temperatura" />
        <FiltersItem content="Precipitación del día anterior" />
        <FiltersItem content="Presencia del hongo" />
        <CustomButton
          content="Aplicar filtros"
          customStyle="w-full mb-10"
        />
      </ul>


    </div>
  )
}

export default Filters;