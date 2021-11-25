import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm';
import { getProyectosByName } from '../../selector/Proyectos';
import { TablaProyectos } from './TablaProyectos';
import axios from 'axios'
import { Link } from 'react-router-dom';

export const ProyectoList = () => {

    const [listProyectos, setListProyectos] = useState([]);
    const [listProyectosEmpyState, setListProyectosEmpyState] = useState(false);


    useEffect(() => {
        axios.get('https://tfi-admrec.herokuapp.com/proyectos').then((response) => {
            setListProyectos(response.data);
            if (response.data.length === 0) {
                setListProyectosEmpyState(true);
            }
        });
    }, []);

    const [formValues, handleInputChange] = useForm({
        search: ''
    });

    const { search } = formValues;

    const proyectosFilter = getProyectosByName(search, listProyectos);

    return (
        <div className='container-fluid'>

            {
                (listProyectos.length !== 0)
                &&
                (
                    <div>
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
                                    <TablaProyectos proyectos={listProyectos} />
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

            {
                (listProyectosEmpyState)
                &&
                (
                    <div>
                        <div className='d-flex justify-content-between me-5 ms-5 mt-5'>
                            <h1 className='mb-2'>Listado de Proyectos</h1>
                        </div>


                        <div className='me-5 ms-5 mt-5'>
                            <div className='text-center'>
                                <h2 className='fst-italic'>Aun no hay Proyectos registrados en el Sistema. Te gustaria agregar uno?</h2>
                                <Link className='btn btn-outline-dark mt-4 w-25' to='/pro/add/0'>Agregar Proyecto</Link>
                            </div>
                        </div>

                    </div>
                )
            }




        </div>
    )
}
