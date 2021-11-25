import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm';
import { getFacturasByRazonSocial } from '../../selector/Facturas';
import { TablaFacturas } from './TablaFacturas';
import axios from 'axios'
import { Link } from 'react-router-dom';

export const FacturasList = () => {

    const [listFacturas, setListFacturas] = useState([]);
    const [listFacturasEmpyState, setListFacturasEmpyState] = useState(false);


    useEffect(() => {
        axios.get('https://tfi-admrec.herokuapp.com/facturas').then((response) => {
            setListFacturas(response.data);
            if (response.data.length === 0) {
                setListFacturasEmpyState(true);
            }
        });
    }, []);

    const [formValues, handleInputChange] = useForm({
        search: ''
    });

    const { search } = formValues;

    const facturasFilter = getFacturasByRazonSocial(search, listFacturas);

    return (
        <div className='container-fluid'>

            {
                (listFacturas.length !== 0)
                &&
                (
                    <div>
                        <div className='d-flex justify-content-between me-5 ms-5 mt-5'>
                            <h1 className='mb-2'>Listado de Facturas</h1>
                            <div className='mt-3'>
                                <span className='me-3 fs-4'>Buscar</span>
                                <input
                                    type='text'
                                    className='p-1 text-center'
                                    name='search'
                                    value={search}
                                    onChange={handleInputChange}
                                    autoComplete='off'
                                    placeholder='Razon Social...'
                                />
                            </div>
                        </div>

                        <div className='me-5 ms-5'>

                            {
                                (search === '') &&
                                (
                                    <TablaFacturas facturas={listFacturas} />
                                )
                            }
                            {
                                (search !== '' && facturasFilter.length !== 0) &&
                                (
                                    <TablaFacturas facturas={facturasFilter} />
                                )
                            }
                            {
                                (search !== '' && facturasFilter.length === 0) &&
                                (
                                    <div className='container mt-5 p-3 bg-danger' style={{ borderRadius: '20px' }}>
                                        <h2 className='text-center mt-2 fst-italic text-white'>
                                            No hay una Factura Asociada a esa Razon Social
                                        </h2>
                                    </div>
                                )
                            }


                        </div>
                    </div>
                )
            }

            {
                (listFacturasEmpyState)
                &&
                (
                    <div>
                        <div className='d-flex justify-content-between me-5 ms-5 mt-5'>
                            <h1 className='mb-2'>Listado de Proyectos</h1>
                        </div>


                        <div className='me-5 ms-5 mt-5'>
                            <div className='text-center'>
                                <h2 className='fst-italic'>Aun no hay Proyectos Facturados Registrados en el Sistema. Te gustaria Facturar un proyecto?</h2>
                                <Link className='btn btn-outline-dark mt-4 w-25' to='/fac/add/0'>Facturar Proyecto</Link>
                            </div>
                        </div>

                    </div>
                )
            }



        </div>
    )
}


/*

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

*/