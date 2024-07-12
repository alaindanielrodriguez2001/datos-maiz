'use client'
import React, { useState } from 'react';
import RegistryTable from '@/components/RegistryTable';
import NewObservationForm from '@/components/NewObservationForm';
import TableSelector from '@/components/TableSelector';
import InfoCard from '@/components/InfoCard';
import PageHeader from "@/components/PageHeader";

const registro = () => {
    return (
        <main className="relative overflow-x-clip scroll-mx-0">

            <PageHeader
                title={<>Registro histórico de variables</>}
                content={<>Almacene las mediciones de variables meteorológicas y estado de las plantas en los
                    terrenos donde se lleva a cabo el cultivo de maíz para la investigación.</>
                }
            />

            <section className="flex flex-col mx-10 px-4 text-maiz">

                <div className="container flex flex-col">

                    <TableSelector />

                    <RegistryTable />

                    <NewObservationForm />

                </div>

            </section>

            <section className="px-10 py-10">

                <hr className="border border-maiz-dark my-5 " />

                <InfoCard
                    imagesrc="/images/tar_spot2.png"
                    title="Predicción de aparición de la enfermedad"
                    text='Sobre la base de la experiencia de los datos históricos guardados en el sistema, y a partir de las diez últimas observaciones, el modelo de aprendizaje de máquina estima que la probabilidad de que la enfermedad aparezca en alguna de las próximas tres observaciones es del __%.'

                />

            </section>
        </main>
    )
}

export default registro;

