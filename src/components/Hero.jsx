'use client'
import PageHeader from "./PageHeader";
import InfoCard from "./InfoCard";


const Hero = () => {
    return (
        <div className="flex flex-col justify-center px-10">
            <PageHeader
                imagesrc="/images/logo.png"
                title={<>Datamaíz</>}
                content={<>
                    <p>El presente software permite el pronóstico de la enfermedad fúngica mancha de asfalto
                        <span className="italic"> (Phyllachora maydis Maubl.) </span> en el cultivo del maíz
                        <span className="italic"> (Zea mays, L.) </span> sobre la base de observaciones
                        meteorológicas.</p>
                    <br />
                    <p>Esta enfermedad está distribuida en Costa Rica, Cuba, República Dominicana, El Salvador, Guatemala, Haití, Honduras,
                        México, Nicaragua, Panamá, Puerto Rico, Trinidad y Tobago, Islas Vírgenes de los Estados Unidos
                        de Norteamérica , Bolivia, Colombia, Ecuador, Perú y Venezuela (CABI, 2020), ocasionando
                        pérdidas en el rendimiento agrícola del cultivo.</p>
                    <br />
                    <p>Los resultados del sistema de pronóstico contribuyen al uso racional y eficiente
                        de los medios fitosanitarios en la agricultura cubana, en empresas agrícolas y
                        diferentes formas productivas de nuestra agricultura. </p>

                </>
                }
            />

            <hr className="border border-maiz-dark my-5 px-4" />

            <div className="my-12 space-y-6 px-4">
                <h1 className="text-7xl text-center text-maiz-dark mb-10">
                    Funcionalidades del software
                </h1>

                <InfoCard
                    imagesrc="/images/hero.jpg"
                    title="Registro de observaciones diarias"
                    text={<><span className="font-bold italic">Datamaíz </span>permite almacenar las mediciones de variables meteorológicas y estado de las plantas en los
                        terrenos de las unidades donde se lleva a cabo el cultivo de maíz para la investigación.</>}
                />

                <InfoCard
                    imagesrc="/images/statistics.jpg"
                    title="Estudio de los datos"
                    text={<>Consulte la información registrada sobre el cultivo y acceda a medidas estadísticas de los datos.</>}
                />

                <InfoCard
                    imagesrc="/images/tar_spot1.jpg"
                    title="Pronóstico de la aparición de la enfermedad"
                    text={<>Esté al tanto de los pronósticos de aparición de la enfermedad fúngica en las unidades de cultivo investigadas.</>}
                />

                <InfoCard
                    imagesrc="/images/campos.jpg"
                    title="Unidades de cultivo"
                    text={<>Guarde y consulte la información sobre los campos de cultivo vinculados al estudio.</>}
                />

                <InfoCard
                    imagesrc="/images/estacion.jpg"
                    title="Estaciones meteorológicas"
                    text={<>Guarde y consulte la información sobre los campos de cultivo vinculados al estudio.</>}
                />


            </div>


        </div>

    );
};

export default Hero;