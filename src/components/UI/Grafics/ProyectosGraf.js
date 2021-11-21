import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { separarEstadoProyectos } from '../../../helpers/Contadores';

export const ProyectosGraf = ({proyectos}) => {

    const estadosProyectos = separarEstadoProyectos(proyectos);
    
    const desarrolloState = estadosProyectos[0].proyectos.length;
    const completadoState = estadosProyectos[1].proyectos.length;


    const data = {
        labels: ['Completados', 'Desarrollo'],
        datasets: [{
            label: '',
            data: [desarrolloState, completadoState],
            backgroundColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    return (
        <div className='mt-5 mb-5'>

            <Doughnut
                data={data}
                height={300}
                width={100}
                options={
                    {maintainAspectRatio: false}
                }
            />

        </div>
    )
}
