import React from 'react';
import PageHeader from '@/components/PageHeader';

const page = () => {
  return (
    <div>
        <PageHeader
            title={"Acerca del software"}
            imagesrc="/images/facultad.jpg"
            content={<>
                <p>
                    Este sistema es el resultado de un proyecto de la Facultad de Ciencias
                    Agropecuarias de la Universidad Central de Las Villas Marta Abreu.
                </p>
                <p>
                    Al mismo tiempo, <span className="italic">Datamaíz</span> fue desarrollado como objeto del trabajo de diploma de 
                    licenciatura del estudiante de Ciencia de la Computación Alain Daniel Rodríguez.
                </p>
            </>}
        />
    </div>
  )
}

export default page;