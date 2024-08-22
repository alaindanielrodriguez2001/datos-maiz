'use client'
import MainComponent from '@/components/MainComponent';
import InfoCard from '@/components/InfoCard';
import PageHeader from "@/components/PageHeader";

const registro = () => {
    return (
        <main className="flex flex-col overflow-x-clip scroll-mx-0 px-10">

            <PageHeader
                title={<>Registro de observaciones</>}
                content={<>Almacene las mediciones de variables meteorológicas y estado de las plantas en los
                    terrenos donde se lleva a cabo el cultivo de maíz para la investigación, y consulte sus estadísticas
                    y el pronóstico sobre la aparición y desarrollo del hongo.</>
                }
            />

            <div className="flex flex-col px-4 text-maiz">
                <div className="container flex flex-col">
                    <MainComponent/>                  
                </div>
            </div>

            <div className="flex flex-col px-4">
                <hr className="border border-maiz-dark my-5 " />
                <InfoCard
                    imagesrc="/images/alert.png"
                    title="Predicción de aparición y desarrollo de la enfermedad"
                    text={<>
                        <p>
                            (Si el hongo no ha aparecido) El sistema estima que las condiciones [son - no son]
                            favorables para la aparición de la enfermedad (infección primaria).
                        </p>
                        <br />
                        <p>
                            (Si el hongo ya está presente) El sistema estima que las condiciones [son - no son]
                            favorables para el desarrollo de la enfermedad.
                        </p>
                    </>}
                />
            </div>

        </main>
    )
}
export default registro;

