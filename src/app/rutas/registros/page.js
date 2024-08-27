'use client'
import RegistroComponent from '@/components/RegistroComponent';
import PageHeader from "@/components/PageHeader";

const registros = () => {
    
    return (
        <main className="flex flex-col overflow-x-clip scroll-mx-0 px-10">

            <PageHeader
                title={<>Registro de observaciones</>}
                content={<p>Almacene las mediciones de variables meteorológicas y estado de las plantas en los
                    terrenos donde se lleva a cabo el cultivo de maíz para la investigación, y consulte sus estadísticas.</p>
                }
            />

            <div className="flex flex-col px-4 text-maiz">
                <div className="container flex flex-col">
                    <RegistroComponent/>                  
                </div>
            </div>

        </main>
    )
}
export default registros;

