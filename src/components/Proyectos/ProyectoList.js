import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm';
import { getProyectosByName } from '../../selector/Proyectos';
import { TablaProyectos } from './TablaProyectos';
import axios from 'axios'

export const ProyectoList = () => {

    const [listProyectos, setListProyectos] = useState([]);

    useEffect(() => {
        axios.get('https://tfi-admrec.herokuapp.com/proyectos').then((response) => {
            setListProyectos(response.data);
        });
    }, []);

    const [formValues, handleInputChange] = useForm({
        search: ''
    });

    const { search } = formValues;

    const proyectosFilter = getProyectosByName(search, listProyectos);

    return (
        <div className='container-fluid'>

            <div className='d-flex justify-content-between me-5 ms-5 mt-5'>
                <h1 className='mb-2'>Listado de Proyectos</h1>
                <div className='mt-3'>
                    <span className='me-3 fs-4'>Buscar</span>
                    <input
                        type='text'
                        className='p-1 text-center'
                        name='search'
                        value={search}
                        onChange={handleInputChange}
                        autoComplete='off'
                        placeholder='Nombre Proyecto'
                    />
                </div>
            </div>

            <div className='me-5 ms-5'>

                {
                    (search === '') &&
                    (
                        <TablaProyectos proyectos={listProyectos}/>
                    )
                }
                {
                    (search !== '' && proyectosFilter.length !== 0) &&
                    (
                        <TablaProyectos proyectos={proyectosFilter} />
                    )
                }
                {
                    (search !== '' && proyectosFilter.length === 0) &&
                    (
                        <div className='container mt-5 p-3 bg-danger' style={{ borderRadius: '20px' }}>
                            <h2 className='text-center mt-2 fst-italic text-white'>
                                No hay un proyecto con ese nombre
                            </h2>
                        </div>
                    )
                }


            </div>

        </div>
    )
}
