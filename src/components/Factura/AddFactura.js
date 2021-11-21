import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm';
import { useParams } from 'react-router';
import axios from 'axios';
import { FacturaGenerated } from './FacturaGenerated';
import Swal from 'sweetalert2'
import Select from 'react-select';


const Pagos = [
    {
        label: "Efectivo",
        value: '1'
    },
    {
        label: "Tarjeta",
        value: '2'
    }
];

const Facturas = [
    {
        label: "A",
        value: '1'
    },
    {
        label: "B",
        value: '2'
    },
    {
        label: "C",
        value: '3'
    }
];

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'black' : 'black',
        padding: 12,
    })
}

const defaultLabelFac = {
    label: "A",
    value: '1'
}

const defaultLabel = {
    label: "Efectivo",
    value: '1'
}

export const AddFactura = ({ history }) => {

    const { clienteId } = useParams();

    const [cliente, setCliente] = useState({});
    const [proyectosFilter, setProyectosFilter] = useState([]);
    const [proyectoFactura, setProyectoFactura] = useState([]);

    const [verifyCliente, setVerifyCliente] = useState(false);
    const [notCliente, setNotCliente] = useState(false);
    const [facturaState, setFacturaState] = useState(false);

    const [optionValue, setOptionValue] = useState('1');
    const [optionValueFac, setOptionValueFac] = useState('1');

    useEffect(() => {

        if (clienteId !== '0') {

            axios.get(`http://localhost:4000/general/${clienteId}`).then((response) => {

                setCliente(response.data[0]);
                setProyectosFilter(response.data[1]);

            });
        }

    }, [clienteId]);

    const [formValues, handleInputChange] = useForm({
        searchFilter: '',
    });

    const { searchFilter } = formValues;

    const handleFilterCliente = () => {

        if (searchFilter === '') {
            Swal.fire({
                title: 'Por favor ingresa un Cuit - Cuil para buscar un cliente',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return;
        } else {

            axios.get(`http://localhost:4000/general/${searchFilter}`).then((response) => {

                if (response.data !== 'Not Found') {
                    setCliente(response.data[0]);
                    setProyectosFilter(response.data[1]);
                    setVerifyCliente(true);
                    setNotCliente(false);
                } else {
                    setCliente({});
                    setProyectosFilter({});
                    setNotCliente(true);
                    setVerifyCliente(false);
                }

            });
        }

    }

    const handleProyectos = (proyecto) => {

        var proyectosDefinitivo = proyectoFactura;

        var b = true;

        if (proyectosDefinitivo.length === 0) {

            proyectosDefinitivo.push(proyecto);

            setProyectoFactura(proyectosDefinitivo);

        } else {
            proyectosDefinitivo.forEach(pro => {
                if (pro.id === proyecto.id) {
                    b = false;
                }
            });

            if (!b) {
                proyectosDefinitivo = proyectosDefinitivo.filter(pro => pro.id !== proyecto.id);
                setProyectoFactura(proyectosDefinitivo);
            } else {
                proyectosDefinitivo.push(proyecto);
                setProyectoFactura(proyectosDefinitivo);
            }
        }
    }

    const generarFactura = (proyectos) => {

        if (proyectos.length === 0) {

            Swal.fire({
                title: 'Por favor selecciona al menos 1 proyecto para generar la factura',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return;

        } else {
            // setProyectoFactura(proyectos);
            setFacturaState(true);
        }
    }

    return (

        <div>

            {
                (clienteId === '0')
                    ?
                    (
                        /* SIN UN PROYECTO PREVIO */
                        <div className='container bg-dark text-white mt-5 mb-5 ' style={{ borderRadius: '20px' }}>

                            <hr />

                            <div className='mt-5 ms-5 me-5 mb-5'>
                                <h2 className='text-center'>Agregar Factura</h2>
                                <hr className='mt-4' />

                                {
                                    (!verifyCliente)
                                        ?
                                        (
                                            <div>
                                                <span className='mt-5 fs-3'>Cliente a Facturar</span>
                                                <input
                                                    type="text"
                                                    className="ms-3 me-3 form-control-lg text-center"
                                                    placeholder='CUIT/CUIL'
                                                    name='searchFilter'
                                                    value={searchFilter}
                                                    onChange={handleInputChange}
                                                />

                                                <button
                                                    className="btn btn-outline-light btn-lg px-5 w-25"
                                                    type="button"
                                                    onClick={handleFilterCliente}
                                                >
                                                    Comprobar
                                                </button>
                                            </div>
                                        )
                                        :
                                        (
                                            <div>

                                                <span className='mt-5 fs-3'>Cliente a Facturar</span>
                                                <input
                                                    type="text"
                                                    className="ms-3 me-3 form-control-lg text-center text-white"
                                                    placeholder='CUIT/CUIL'
                                                    name='searchFilter'
                                                    value={cliente.apellidoyNombre}
                                                    disabled
                                                />
                                                <button
                                                    className="btn btn-outline-warning btn-lg px-5 w-25"
                                                    type="button"
                                                    onClick={() => { window.location.reload(); }}
                                                >
                                                    Cancelar Asociacion
                                                </button>
                                            </div>
                                        )
                                }

                            </div>
                            {
                                (verifyCliente)
                                &&
                                (
                                    <div className='mt-5 ms-5 me-5 mb-5'>
                                        <h3>Proyectos del Cliente - [{cliente.apellidoyNombre}]</h3>

                                        <h5 className='mt-4'> <i className="fas fa-info-circle me-3"></i> Esta lista corresponde a los proyectos aun no Facturados del cliente </h5>
                                        <h5 className='mt-2'> <i className="fas fa-info-circle me-3"></i> Por favor selecciona a continuacion los proyectos que quieres agregar en la generacion de la Factura </h5>


                                        <div className='mt-5 ms-5 me-5 bg-white text-dark p-4' style={{ borderRadius: '20px' }}>

                                            <div className='row'>

                                                {
                                                    proyectosFilter.map(proyecto => (

                                                        <div className="col-3 form-check form-switch ms-5 mb-3 mt-3" key={proyecto.id}>
                                                            <input className="form-check-input me-3" type="checkbox" onChange={() => { handleProyectos(proyecto) }} />
                                                            <label className="form-check-label fs-5" >{proyecto.nombre}</label>
                                                        </div>

                                                    ))
                                                }

                                            </div>

                                        </div>

                                        <div className='mt-5' style={{ borderRadius: '20px' }}>


                                            <div className='row mt-5 mb-5'>
                                                <div className='col-3'>
                                                    <h3>Metodo de Pago</h3>
                                                </div>
                                                <div className='col-3'>
                                                    <Select
                                                        className='mt-1 fw-bold text-center'
                                                        options={Pagos}
                                                        defaultValue={defaultLabel}
                                                        onChange={(e) => { setOptionValue(e.value) }}
                                                        styles={customStyles}
                                                        isSearchable={false}
                                                    />
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-3'>
                                                    <h3>Tipo de Factura</h3>
                                                </div>
                                                <div className='col-3'>
                                                    <Select
                                                        className='mt-1 fw-bold text-center'
                                                        options={Facturas}
                                                        defaultValue={defaultLabelFac}
                                                        onChange={(e) => { setOptionValueFac(e.value) }}
                                                        styles={customStyles}
                                                        isSearchable={false}
                                                    />
                                                </div>
                                            </div>

                                        </div>


                                        <div className='mt-5'>
                                            <div className="row d-flex justify-content-center align-items-center">

                                                {
                                                    (facturaState)
                                                        ?
                                                        (
                                                            <div className='col-6'>
                                                                <button className="btn btn-outline-warning w-100"
                                                                    type="button"
                                                                    onClick={() => { window.location.reload(); }}
                                                                >
                                                                    Cancelar Generacion Factura
                                                                </button>
                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            <div className='col-6'>
                                                                <button className="btn btn-outline-light w-100"
                                                                    type="button"
                                                                    onClick={() => {
                                                                        generarFactura(proyectoFactura);
                                                                    }}
                                                                >
                                                                    Generar Factura
                                                                </button>
                                                            </div>
                                                        )
                                                }

                                            </div>
                                        </div>

                                    </div>
                                )

                            }
                            {
                                (notCliente)
                                &&
                                (
                                    <div className='mt-5 ms-5 me-5 mb-5'>
                                        <h3>No existe el Cliente asociado al CUIT/CUIL que ingresaste</h3>
                                    </div>
                                )

                            }

                            <hr />

                        </div>
                    )
                    :
                    (
                        /* CON UN PROYECTO PREVIO */
                        <div className='container bg-dark text-white mt-5 mb-5 ' style={{ borderRadius: '20px' }}>

                            <hr />

                            <div className='mt-5 ms-5 me-5 mb-5'>
                                <h2 className='text-center'>Agregar Factura</h2>
                                <hr className='mt-4' />

                                <span className='mt-5 fs-3'>Cliente a Facturar</span>

                                <input
                                    type="text"
                                    className="ms-3 me-3 form-control-lg text-center text-white"
                                    placeholder='CUIT/CUIL'
                                    name='cliente'
                                    disabled
                                    value={cliente.apellidoyNombre}
                                />

                            </div>


                            <div className='mt-5 ms-5 me-5 mb-5'>

                                <h3>Proyectos del Cliente - [{cliente.apellidoyNombre}]</h3>

                                <h5 className='mt-4'> <i className="fas fa-info-circle me-3"></i> Esta lista corresponde a los proyectos aun no Facturados del cliente </h5>
                                <h5 className='mt-2'> <i className="fas fa-info-circle me-3"></i> Por favor selecciona a continuacion los proyectos que quieres agregar en la generacion de la Factura </h5>


                                <div className='mt-5 ms-5 me-5 bg-white text-dark p-4' style={{ borderRadius: '20px' }}>

                                    <div className='row'>

                                        {
                                            proyectosFilter.map(proyecto => (

                                                <div className="col-3 form-check form-switch ms-5 mb-3 mt-3" key={proyecto.id}>
                                                    <input className="form-check-input me-3" type="checkbox" onChange={() => { handleProyectos(proyecto) }} />
                                                    <label className="form-check-label fs-5">{proyecto.nombre}</label>
                                                </div>

                                            ))
                                        }

                                    </div>

                                </div>

                                <div className='mt-5' style={{ borderRadius: '20px' }}>

                                    <div className='row mt-5 mb-5'>
                                        <div className='col-3'>
                                            <h3>Metodo de Pago</h3>
                                        </div>
                                        <div className='col-3'>
                                            <Select
                                                className='mt-1 fw-bold text-center'
                                                options={Pagos}
                                                defaultValue={defaultLabel}
                                                onChange={(e) => { setOptionValue(e.value) }}
                                                styles={customStyles}
                                                isSearchable={false}
                                            />
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-3'>
                                            <h3>Tipo de Factura</h3>
                                        </div>
                                        <div className='col-3'>
                                            <Select
                                                className='mt-1 fw-bold text-center'
                                                options={Facturas}
                                                defaultValue={defaultLabelFac}
                                                onChange={(e) => { setOptionValueFac(e.value) }}
                                                styles={customStyles}
                                                isSearchable={false}
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className='mt-5'>
                                    <div>

                                        {
                                            (facturaState)
                                                ?
                                                (
                                                    <div className="row ">
                                                        <div className='col-12 d-flex justify-content-center align-items-center'>
                                                            <button className="btn btn-outline-warning w-25"
                                                                type="button"
                                                                onClick={() => { window.location.reload(); }}
                                                            >
                                                                Cancelar Generacion Factura
                                                            </button>
                                                        </div>
                                                    </div>

                                                )
                                                :
                                                (
                                                    <div className="row ">
                                                        <div className='col-12 d-flex justify-content-center align-items-center'>
                                                            <button className="btn btn-outline-light w-25"
                                                                type="button"
                                                                onClick={() => {
                                                                    generarFactura(proyectoFactura);
                                                                }}
                                                            >
                                                                Generar Factura
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                        }

                                    </div>
                                </div>

                            </div>

                            <hr />

                        </div>
                    )
            }

            {
                (facturaState) &&
                (
                    <div>
                        <FacturaGenerated proyectos={proyectoFactura} cliente={cliente} tipoFac={optionValueFac} medioPago={optionValue} history={history}/>
                    </div>
                )

            }

        </div>

    )
}

