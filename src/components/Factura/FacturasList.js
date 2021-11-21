import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm';
import { getFacturasByRazonSocial } from '../../selector/Facturas';
import { TablaFacturas } from './TablaFacturas';
import axios from 'axios'

export const FacturasList = () => {

    const [listFacturas, setListFacturas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/facturas').then((response) => {
            setListFacturas(response.data);
        });
    }, []);

    const [formValues, handleInputChange] = useForm({
        search: ''
    });

    const { search } = formValues;

    const facturasFilter = getFacturasByRazonSocial(search, listFacturas);

    /* ME FALTA HACER UN FILTRO QUE DE LOS PROYECTOS POR NOMBRE */

    return (
        <div className='container-fluid'>

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
                        <TablaFacturas facturas={listFacturas}/>
                    )
                }
                {
                    (search !== '' && facturasFilter.length !== 0) &&
                    (
                        <TablaFacturas facturas={facturasFilter}/>
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
