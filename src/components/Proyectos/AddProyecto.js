import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Select from 'react-select';
import { useForm } from '../../hooks/useForm';
import { useParams } from 'react-router';
import axios from 'axios';

const Fechas = [
    {
        label: "Dias",
        value: '1'
    },
    {
        label: "Meses",
        value: '2'
    },
    {
        label: "Años",
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

const defaultLabel = {
    label: "Dias",
    value: '1'
}

export const AddProyecto = ({ history }) => {

    const { clienteId } = useParams();
    const [cliente, setCliente] = useState({});
    const [clienteState, setClienteState] = useState(false);
    const [optionValue, setOptionValue] = useState('1');


    useEffect(() => {
        if (clienteId !== '0') {
            axios.get(`https://tfi-admrec.herokuapp.com/clientes/${clienteId}`).then((response) => {
                setCliente(response.data);
                setClienteState(true);
            });
        }
    }, [clienteId]);

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    var fechaInicioToday = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();

    var fechaFin = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
    const [fechaFinValue, setFechaFinValue] = useState(fechaFin);

    const [formValues, handleInputChange] = useForm({
        name: '',
        desc: '',
        cot: '',
        dur: '',
        fInicio: fechaInicioToday,
        searchFilter: '',
    });

    const { name, desc, cot, dur, fInicio, searchFilter } = formValues;

    const handleRegister = () => {

        if (name === '' || desc === '' || cot === '' || dur === '' || fInicio === '') {

            Swal.fire({
                title: 'Por favor completa todos los campos',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return;
        }

        /* AQUI FALTA EL IF DE COMPROBAR AL CLIENTE */

        if (!clienteState) {
            Swal.fire({
                title: 'No ha Enlazado ningun cliente en el proyecto.',
                text: 'Por favor, verifique la entrada del cliente y vuelva a intentarlo',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            });

            return;
        }

        /* --------------TODO ESTA CORRECTRO. PUEDO AGREGAR EL PROYECTO----------------- */

        var durationComplete = '';

        switch (optionValue) {
            case '1':
                durationComplete = dur + ' Dias';
                break;
            case '2':
                durationComplete = dur + ' Meses';
                break;
            case '3':
                durationComplete = dur + ' Años';
                break;

            default:
                break;
        }

        var data = {

            nombre: name,
            descripcion: desc,
            duracion: durationComplete,
            cotizacion: parseFloat(cot),
            estado: 'Desarrollo',
            fechaInicio: fInicio,
            fechaFin: fechaFinValue,
            ClienteId: cliente.id
        }

        axios.post('https://tfi-admrec.herokuapp.com/proyectos', data).then((response) => {
            Swal.fire({
                title: 'Proyecto Agregado Correctamente',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            }).then((result) => {
                if (result.isConfirmed) {
                    history.push('/pro/list');
                }
            });
        });


    }

    function handleFilterCliente() {

        axios.get(`https://tfi-admrec.herokuapp.com/clientes/cc/${searchFilter}`).then((response) => {

            if (response.data !== 'Not Found') {

                setCliente(response.data);
                setClienteState(true);

                Swal.fire({
                    title: 'Cliente encontrado con exito',
                    text: 'Proyecto relacionado con ' + response.data.apellidoyNombre,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continuar'
                });

            } else {

                setCliente({});
                setClienteState(false);

                Swal.fire({
                    title: 'El Cliente que intentas buscar no existe.',
                    text: 'Por favor verifica que los datos ingresados sean correctos e intenta de nuevo',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continuar'
                });
            }
        });
    }

    const handleCancelCliente = () => {

        setCliente({});
        setClienteState(false);

    }

    const handleChangeFechaFin = (duracion) => {

        var cant = parseInt(dur);

        switch (duracion) {
            case '1':
                cant = dur
                break;
            case '2':
                cant = dur * 30.417
                break;
            case '3':
                cant = dur * 365
                break;

            default:
                break;
        }

        cant = parseInt(cant);

        var fechaActual = new Date();
        var fechaFin = new Date(fechaActual.getTime() + (cant * 24 * 60 * 60 * 1000));
        var day = fechaFin.getDate();
        var month = fechaFin.getMonth() + 1;
        var year = fechaFin.getFullYear();

        if(month<10){
            month = '0'+month
        }

        if(day<10){
            day = '0'+day
        }

        var fechaReturn = year + '-' + month + '-' + day

        setFechaFinValue(fechaReturn);
    }

    return (

        <div className='container-lg container-md-fluid p-5 bg-dark text-white mt-5 mb-5' style={{ borderRadius: '1rem' }}>

            <div className='row text-center'>
                <div className='col-12'>
                    <h2 className="fw-bold text-uppercase">Datos del Proyecto</h2>
                    <p className="text-white-50">Por favor Completa el formulario a continuacion con la informacion del proyecto</p>
                    <hr />
                </div>
            </div>

            <div className='row mt-3'>

                <div className='col-7'>
                    <div className="form-outline form-white mb-4">
                        <span className="fs-5">Nombre del Proyecto</span>
                        <input
                            type="text"
                            className="form-control form-control-lg text-center"
                            placeholder='Nombre...'
                            name='name'
                            value={name}
                            onChange={handleInputChange}
                            autoComplete='off'
                        />
                    </div>

                    <div className="form-outline form-white mb-4">
                        <span className="fs-5">Descripcion del Proyecto</span>
                        <textarea
                            name="desc"
                            className="form-control form-control-lg"
                            rows='8'
                            placeholder='Agregue una descripcion detallada'
                            value={desc}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div className='col-5'>

                    <div className="form-outline form-white mb-4">
                        <span className="fs-5">Cotizacion</span>
                        <input
                            type="text"
                            className="form-control form-control-lg text-center"
                            placeholder='($)'
                            autoComplete="off"
                            name='cot'
                            value={cot}
                            onChange={handleInputChange}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                        />
                    </div>

                    <div className='row'>
                        <span className="fs-5">Duracion</span>
                        <div className='col-6'>
                            <div className="form-outline form-white mb-4">
                                <input
                                    type="text"
                                    className="form-control form-control-lg text-center"
                                    placeholder='Duracion'
                                    autoComplete="off"
                                    name='dur'
                                    value={dur}
                                    onChange={handleInputChange}
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className='col-6'>
                            <Select
                                className='mt-1 fw-bold text-center'
                                options={Fechas}
                                defaultValue={defaultLabel}
                                onChange={(e) => { setOptionValue(e.value); handleChangeFechaFin(e.value); }}
                                styles={customStyles}
                                isSearchable={false}
                            />
                        </div>
                    </div>

                    <div className="form-outline form-white mb-4">
                        <span className="fs-5">Fecha de Inicio</span>
                        <input
                            type="date"
                            className="form-control form-control-lg text-center"
                            placeholder='Fecha de Inicio'
                            name='fInicio'
                            value={fInicio}
                            onChange={handleInputChange}

                        />
                    </div>

                    <div className="form-outline form-white mb-4">
                        <span className="fs-5">Fecha de Finalizacion (Aproximado)</span>
                        <input
                            type="date"
                            className="form-control form-control-lg text-center"
                            placeholder='Fecha de Finalizacion'
                            value={fechaFinValue}
                        />
                    </div>
                </div>
            </div>

            <hr />

            <div className='mt-5 mb-5'>

                {
                    (clienteId === '0')
                        ?
                        (
                            <div>
                                {
                                    (!clienteState)
                                        ?
                                        (
                                            <div>
                                                <span className="fs-5">Cliente Asociado</span>
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
                                                <span className="fs-5">Cliente Asociado</span>
                                                <input
                                                    type="text"
                                                    className="ms-3 me-3 form-control-lg text-center text-white"
                                                    placeholder='CUIT/CUIL'
                                                    disabled
                                                    value={cliente.apellidoyNombre}

                                                />

                                                <button
                                                    className="btn btn-outline-warning btn-lg px-5 w-25"
                                                    type="button"
                                                    onClick={handleCancelCliente}
                                                >
                                                    Cancelar Asociacion
                                                </button>

                                            </div>
                                        )
                                }


                            </div>
                        )
                        :
                        (
                            <div>
                                <span className="fs-5">Cliente Asociado</span>
                                <input
                                    type="text"
                                    className="ms-3 me-3 form-control-lg text-center text-white"
                                    placeholder='CUIT/CUIL'
                                    disabled
                                    value={cliente.apellidoyNombre}

                                />
                            </div>
                        )
                }


            </div>

            <hr />

            <div className='d-flex justify-content-end'>
                <button
                    className="btn btn-outline-light btn-lg px-5 mt-4 w-25"
                    type="button"
                    onClick={handleRegister}
                >
                    Registrar
                </button>
            </div>

        </div>

    )
}


