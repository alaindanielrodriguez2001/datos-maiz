'use client'
import PageHeader from "./PageHeader";
import InfoCard from "./InfoCard";
import Seccion from "./Seccion";


const Hero = () => {
    return (
        <div className="flex flex-col justify-center px-10">

            <PageHeader
                imagesrc="/images/logo.png"
                title={<>Datamaíz</>}
                content={
                    <>
                        <p>El presente software permite el pronóstico de la enfermedad fúngica mancha de asfalto
                            <span className="italic"> (Phyllachora maydis Maubl.) </span> en el cultivo del maíz
                            <span className="italic"> (Zea mays, L.) </span> sobre la base de observaciones
                            meteorológicas.</p>
                        <br />
                        <p>Los resultados del sistema de pronóstico contribuyen al uso racional y eficiente
                            de los medios fitosanitarios en la agricultura cubana, en empresas agrícolas y
                            diferentes formas productivas de nuestra agricultura. </p>
                </>
                }
            />

            <Seccion
                title={"Funcionalidades del software"}
                content={
                    <>
                        <InfoCard
                            imagesrc="/images/hero.jpg"
                            title="Registro de observaciones meteorológicas diarias"
                            text={
                                <>
                                    <span className="font-bold italic">Datamaíz </span>permite almacenar 
                                    las mediciones de variables meteorológicas
                                    de las estaciones correspondientes a las 
                                    unidades donde se lleva a cabo el cultivo 
                                    de maíz para la investigación.
                                </>
                            }
                        />
                        <InfoCard
                            imagesrc="/images/statistics.jpg"
                            title="Estudio de los datos"
                            text={
                                <>
                                    Consulte la información registrada sobre el cultivo 
                                    y acceda a medidas estadísticas de los datos.
                                </>
                            }
                        />
                        <InfoCard
                            imagesrc="/images/tar_spot1.jpg"
                            title="Pronóstico de la aparición de la enfermedad"
                            text={
                                <>
                                    Esté al tanto de los pronósticos de incidencia de 
                                    la enfermedad fúngica en las unidades de cultivo investigadas.
                                </>
                            }
                        />
                        <InfoCard
                            imagesrc="/images/campos.jpg"
                            title="Unidades de cultivo"
                            text={
                                <>
                                    Guarde y consulte la información sobre los campos 
                                    de cultivo vinculados al estudio.
                                </>
                            }
                        />
                        <InfoCard
                            imagesrc="/images/estacion.jpg"
                            title="Estaciones meteorológicas"
                            text={
                                <>
                                    Guarde y consulte la información sobre los campos 
                                    de cultivo vinculados al estudio.
                                </>
                            }
                        />
                    </>
                }
            />

            <Seccion
                title={"Autoría y propiedad"}
                content={
                    <>
                        <InfoCard
                            imagesrc="/images/universidad.png"
                            text={
                                <>
                                    Este software pertenece a la Universidad Central 
                                    de Las Villas "Marta Abreu", como proyecto de la 
                                    Facultad de Ciencias Agropecuarias y la Facultad 
                                    de Matemática, Física y Computación. Fue desarrollado 
                                    en 2024 como trabajo de diploma del estudiante de Lic.
                                    en Ciencia de la Computación Alain Daniel Rodríguez Domínguez,
                                    con el Lic. Alejandro Cespón y el Dr.C. Orlando Miguel 
                                    Saucedo Castillo como tutores.
                                </>
                            }
                        />              
                    </>
                }
            />
        </div>

    );
};

export default Hero;