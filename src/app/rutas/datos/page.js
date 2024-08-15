'use client'
import MainComponent from '@/components/MainComponent';
import InputForm from '@/components/InputForm'
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

                    <InputForm
                        formFields={[
                            { name: 'campo', type: 'select', placeholder: 'Seleccione un campo' },
                            { name: 'fecha', type: 'date', placeholder: 'Fecha' },
                            { name: 'fase_fenologica', type: 'number', placeholder: 'Fase fenológica' },
                            { name: 'humedad_maxima', type: 'number', placeholder: 'Humedad relativa máxima' },
                            { name: 'humedad_minima', type: 'number', placeholder: 'Humedad relativa mínima' },
                            { name: 'humedad_media', type: 'number', placeholder: 'Humedad relativa media' },
                            { name: 'temperatura_maxima', type: 'number', placeholder: 'Temperatura máxima' },
                            { name: 'temperatura_minima', type: 'number', placeholder: 'Temperatura mínima' },
                            { name: 'temperatura_media', type: 'number', placeholder: 'Temperatura media' },
                            { name: 'precipitacion', type: 'number', placeholder: 'Precipitación' },
                            { name: 'presencia_del_hongo', type: 'checkbox', placeholder: 'Presencia del hongo' },
                        ]}
                        fetchUrl={`${process.env.NEXT_PUBLIC_API_URL}/campos/`}
                        postUrl={`${process.env.NEXT_PUBLIC_API_URL}/observaciones/`}
                        buttonText="Registrar nueva observación"
                    />
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

