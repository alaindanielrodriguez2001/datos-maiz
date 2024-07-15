import React from 'react'
import PageHeader from '@/components/PageHeader'
import FieldsTable from '@/components/FieldsTable'

const page = () => {
    return (
        <div>
            <main className="relative overflow-x-clip scroll-mx-0 px-10">

                <PageHeader
                    title={<>Campos de cultivo</>}
                    content={<>En la tabla siguiente puede acceder a los datos de los campos de cultivo vinculados al estudio.</>
                    }
                />

                <FieldsTable className="px-4"/>

            </main>
        </div>
    )
}

export default page