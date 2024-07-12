'use client'
import PageHeader from "./PageHeader";
import InfoCard from "./InfoCard";


const Hero = () => {
    return (
        <>
            <PageHeader
                imagesrc="/images/logo.png"
                title={<>Datamaíz</>}
                content={<>Este software tiene como objetivo permitir a los investigadores 
                    realizar el registro digital de datos sobre el cultivo del maíz en varias 
                    localidades del centro de Cuba, con enfoque en la aparición de la enfermedad 
                    <span className="italic"> Phyllachora maydis</span> o "mancha de asfalto".</>
                }
            />

            <hr className="border border-maiz-dark my-5 " />

            <div className="my-12 space-y-6">
                <h1 className="text-7xl text-center text-maiz-dark mb-10">
                    Funcionalidades del software
                </h1>

                <InfoCard
                    imagesrc="/images/hero.jpg"
                    title="Registro de observaciones periódicas"
                    text={<><span className="font-bold italic">Datamaíz </span>permite almacenar las mediciones de variables meteorológicas y estado de las plantas en los
                        terrenos donde se lleva a cabo el cultivo de maíz para la investigación.</>}
                />

                <InfoCard
                    imagesrc="/images/statistics.jpg"
                    title="Estudio de los datos"
                    text={<>Consulte la información registrada sobre el cultivo y acceda a medidas estadísticas de los datos.</>}
                />

                <InfoCard
                    imagesrc="/images/tar_spot1.jpg"
                    title="Predicción de la aparición de la enfermedad"
                    text={<>Use un modelo de aprendizaje de máquina basado en los patrones históricos para predecir la aparición de la mancha de asfalto.</>}
                />

                <InfoCard
                    imagesrc="/images/report.jpg"
                    title="Anotaciones"
                    text={<>Redacte, guarde y consulte anotaciones sobre los cultivos, ya se trate de reportes de su estado, incidentes, observaciones, descubrimientos, o cualquier otro tipo de documento de interés para la investigación.</>}
                />



            </div>


        </>

    );
};

export default Hero;