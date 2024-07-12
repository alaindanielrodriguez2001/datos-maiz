import React from 'react'
import PageHeader from '@/components/PageHeader'

const page = () => {
    return (
        <div>
            <main className="relative overflow-x-clip scroll-mx-0">

            <PageHeader
                title={<>Anotaciones</>}
                content={<>Redacte, guarde y consulte anotaciones sobre los cultivos, 
                    ya se trate de reportes de su estado, incidentes, observaciones, 
                    descubrimientos, o cualquier otro tipo de documento de interés para la investigación.</>
                }
            />

            </main>
        </div>
    )
}

export default page