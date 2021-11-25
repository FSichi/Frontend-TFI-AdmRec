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
    
    // var fechaFin = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate() ;
    // const [fechaFinValue, setFechaFinValue] = useState(fechaFin);

    const [formValues, handleInputChange] = useForm({
        name: '',
        desc: '',
        cot: '',
        dur: '',
        fInicio: fechaInicioToday,
        fFin: '',
        searchFilter: '',
    });

    const { name, desc, cot, dur, fInicio, fFin, searchFilter } = formValues;

    const handleRegister = () => {

        if (name === '' || desc === '' || cot === '' || dur === '' || fInicio === '' || fFin === '') {

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
            fechaFin: fFin,
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

/*     const handleChangeFechaFin = (duracion) => {

        var fechaFinAñoActual = fechaFinValue[0] + fechaFinValue[1] + fechaFinValue[2] + fechaFinValue[3]
        var fechaFinMesActual = fechaFinValue[5] + fechaFinValue[6] 
        var fechaFinDiaActual = fechaFinValue[8] + fechaFinValue[9] 

        var ffA = parseInt(fechaFinAñoActual);
        var ffM = parseInt(fechaFinMesActual);
        var ffD = parseInt(fechaFinDiaActual);

        var opcion = '';
        var cant = parseInt(dur);

        var totalDias = 0;
        var totalMes = 0;
        var totalAños = 0;
    
        switch (duracion) {
            case '1':
                opcion = 'Dias'
                break;
            case '2':
                opcion = 'Meses'
                break;
            case '3':
                opcion = 'Años'
                break;
        
            default:
                break;
        }

        console.log(dur,opcion);

        if(opcion === 'Dias'){

            totalDias = ffD + cant

            switch (ffM) {
                case 1:
                    console.log('Mes de 31');
                    break; 
                case 2:
                    console.log('Febrero');
                    break; 
                case 3:
                    console.log('Mes de 31');
                    break; 
                case 4:
                    console.log('Mes de 30');
                    break; 
                case 5:
                    console.log('Mes de 31');
                    break; 
                case 6:
                    console.log('Mes de 30');
                    break; 
                case 7:
                    console.log('Mes de 31');
                    break; 
                case 8:
                    console.log('Mes de 31');
                    break; 
                case 9:
                    console.log('Mes de 30');
                    break; 
                case 10:
                    console.log('Mes de 31');
                    break; 
                case 11:
                    console.log('Mes de 30');
                    break; 
                case 12:
                    console.log('Mes de 31');
                    break; 
                            
                default:
                    break;
            }
        }

    } */

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
                                onChange={(e) => { setOptionValue(e.value); /* handleChangeFechaFin(e.value); */ }}
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
                            name='fFin'
                            value={fFin}
                            onChange={handleInputChange}
                            
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


