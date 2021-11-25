import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm';
import { getClientesByAll } from '../../selector/Clientes';
import { TablaClientes } from './TablaClientes';
import axios from 'axios'
import { Link } from 'react-router-dom';

export const ClientesList = () => {

    const [listClientes, setListClientes] = useState([]);
    const [listClientesEmpyState, setListClientesEmpyState] = useState(false);

    useEffect(() => {

        axios.get('https://tfi-admrec.herokuapp.com/clientes').then((response) => {
            setListClientes(response.data);

            if (response.data.length === 0) {
                setListClientesEmpyState(true);
            }

        });

    }, []);

    const [formValues, handleInputChange] = useForm({
        search: ''
    });

    const { search } = formValues;

    const clientesFilter = getClientesByAll(search, listClientes);

    return (

        <div className='container-fluid'>

            {
                (listClientes.length !== 0)
                &&
                (
                    <div>
                        <div className='d-flex justify-content-between me-5 ms-5 mt-5'>
                            <h1 className='mb-2'>Listado de Clientes</h1>

                            <div className='mt-4'>
                                <span className='me-3 fs-4'>Buscar</span>
                                <input
                                    type='text'
                                    className='p-1'
                                    name='search'
                                    value={search}
                                    onChange={handleInputChange}
                                    autoComplete='off'
                                    placeholder='Nombre / Cuil-Cuit'
                                />
                            </div>
                        </div>

                        <div className='me-5 ms-5'>

                            {
                                (search === '')
                                &&
                                (
                                    <TablaClientes clientes={listClientes} />
                                )
                            }
                            {
                                (search !== '' && clientesFilter.length !== 0) &&
                                (
                                    <TablaClientes clientes={clientesFilter} />
                                )
                            }
                            {
                                (search !== '' && clientesFilter.length === 0) &&
                                (
                                    <div className='container mt-5 p-3 bg-danger' style={{ borderRadius: '20px' }}>
                                        <h2 className='text-center mt-2 fst-italic text-white'>
                                            No Existe el cliente que buscas
                                        </h2>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                )

            }

            {
                (listClientesEmpyState)
                &&
                (
                    <div>
                        <div className='d-flex justify-content-between me-5 ms-5 mt-5'>
                            <h1 className='mb-2'>Listado de Clientes</h1>
                        </div>

                        <div className='me-5 ms-5 mt-5'>
                            <div className='text-center'>
                                <h2 className='fst-italic'>Aun no hay clientes registrados en el Sistema. Te gustaria agregar uno?</h2>
                                <Link className='btn btn-outline-dark mt-4 w-25' to='/cli/add'>Agregar Cliente</Link>
                            </div>
                        </div>

                    </div>
                )
            }

        </div>
    )
}
