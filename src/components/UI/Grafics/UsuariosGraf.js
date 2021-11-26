import React from 'react'
import { Bar } from 'react-chartjs-2'
import { separarClientes, separarEstadoProyectos } from '../../../helpers/Contadores';
import { getProyectosByCliente } from '../../../selector/Proyectos';

export const UsuariosGraf = ({ clientes, proyectos }) => {

    const clientesFilter = separarClientes(clientes, proyectos);

    console.log(clientesFilter);

    const c1Pro = separarEstadoProyectos(getProyectosByCliente(clientesFilter[0].user.id, proyectos));
    const c2Pro = separarEstadoProyectos(getProyectosByCliente(clientesFilter[1].user.id, proyectos));
    const c3Pro = separarEstadoProyectos(getProyectosByCliente(clientesFilter[2].user.id, proyectos));

    const proDes = [
        c1Pro[0].proyectos.length,
        c2Pro[0].proyectos.length,
        c3Pro[0].proyectos.length,
    ]

    const proComp = [
        c1Pro[1].proyectos.length,
        c2Pro[1].proyectos.length,
        c3Pro[1].proyectos.length,
    ]
                
    const data = {
        labels: [ clientesFilter[0].user.apellidoyNombre, clientesFilter[1].user.apellidoyNombre, clientesFilter[2].user.apellidoyNombre ],
        datasets: [
            {
                label: 'Completados',
                data: proComp,
                backgroundColor: 'rgba(75, 192, 192, 1)',
                borderColor: 'rgba(75, 192, 192)',
                borderWidth: 1
            },
            {
                label: 'Desarrollo',
                data: proDes,
                backgroundColor: 'rgba(255, 159, 64, 1)',
                borderColor: 'rgba(255, 159, 64)',
                borderWidth: 1
            },
        ]
    };

    return (
        <div className='mt-5 mb-5'>
            <Bar
                data={data}
                height={300}
                width={100}
                options={
                    { maintainAspectRatio: false }
                }
            />
        </div>
    )
}
