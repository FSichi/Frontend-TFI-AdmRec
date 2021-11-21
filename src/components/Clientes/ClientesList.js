import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm';
import { getClientesByAll } from '../../selector/Clientes';
import { TablaClientes } from './TablaClientes';
import axios from 'axios'


export const ClientesList = () => {

    const [listClientes, setListClientes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/clientes').then((response) => {
            setListClientes(response.data);
        });
    }, []);

    const [formValues, handleInputChange] = useForm({
        search: ''
    });

    const { search } = formValues;

    const clientesFilter = getClientesByAll(search, listClientes);

    return (

        <div className='container-fluid'>

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
