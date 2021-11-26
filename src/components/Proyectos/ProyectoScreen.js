import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useForm } from '../../hooks/useForm';

const Estados = [
    {
        label: "Desarrollo",
        value: '1'
    },
    {
        label: "Completado",
        value: '2'
    },
];

export const ProyectoScreen = ({ history }) => {

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'black' : 'black',
            padding: 12,
        })
    }

    var defaultLabel = {
        label: ''
    }

    const { proyectoId } = useParams();

    const [proyecto, setProyecto] = useState({});
    const [cliente, setCliente] = useState({});
    const [detalles, setDetalles] = useState([]);

    const [fechaFinValue, setFechaFinValue] = useState('');

    const [proyectoState, setProyectoState] = useState(false);
    const [actualizarState, setActualizarState] = useState(false);

    const [optionValue, setOptionValue] = useState('1');

    useEffect(() => {

        axios.get(`https://tfi-admrec.herokuapp.com/proyectos/pc/${proyectoId}`).then((response) => {
            setProyecto(response.data[0]);
            setCliente(response.data[1]);
            setProyectoState(true);

            setFechaFinValue(response.data[0].fechaFin);

            if (response.data[0].estado === 'Desarrollo') {
                setOptionValue('1');
            } else if (response.data[0].estado === 'Completado') {
                setOptionValue('2');
            }

        });

        axios.get(`https://tfi-admrec.herokuapp.com/detalles`).then((response) => {
            setDetalles(response.data);
        });

    }, [proyectoId]);

    if (proyectoState) {
        defaultLabel.label = proyecto.estado;
    }

    const { nombre, descripcion, duracion, cotizacion, estado, fechaInicio, ClienteId } = proyecto;

    const [formValues, handleInputChange] = useForm({
        nom: nombre,
        des: descripcion,
        dur: duracion,
        cot: cotizacion,
        est: estado,
        fInicio: fechaInicio,
    });

    const { nom, des, dur, cot, fInicio } = formValues;

    const handleFacturaRedirect = () => {

        var b = false;
        var id = '';

        detalles.forEach(detalle => {


            if (detalle.ProyectoId === parseInt(proyectoId)) {
                console.log('Entre');
                id = detalle.FacturaId;
                b = true;
            }

        });

        if (b) {
            history.push(`/fac/${id}`);
        } else {

            Swal.fire({
                title: 'Este proyecto aun no se Facturo',
                text: "¿Quieres hacerlo ahora?",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Adelante',
                cancelButtonText: 'Ahora no'
            }).then((result) => {
                if (result.isConfirmed) {
                    history.push(`/fac/add/${cliente.cuit_cuil}`);
                }
            })
        }

    }

    const handleDelete = () => {

        Swal.fire({
            title: 'Estas Seguro?',
            text: "Esto eliminara permanentemente el Proyecto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`https://tfi-admrec.herokuapp.com/proyectos/${proyectoId}`).then((response) => {
                    Swal.fire(
                        'Proyecto eliminado!',
                        '',
                        'success'
                    );

                    history.push('/pro/list');
                });
            }
        });

    }

    const handleUpdate = () => {

        var est = '';
        var fechaFin = fechaFinValue

        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);

        if (optionValue === '1') {
            est = 'Desarrollo'
        } else {
            est = 'Completado'
            fechaFin = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
        }

        var data = {
            nombre: '',
            descripcion: '',
            duracion: '',
            cotizacion: '',
            estado: est,
            fechaInicio: '',
            fechaFin: fechaFin
        }

        if (nom === undefined) {
            data.nombre = nombre
        } else {
            data.nombre = nom
        }

        if (des === undefined) {
            data.descripcion = descripcion
        } else {
            data.descripcion = des
        }

        if (dur === undefined) {
            data.duracion = duracion
        } else {
            data.duracion = dur
        }

        if (cot === undefined) {
            data.cotizacion = parseInt(cotizacion)
        } else {
            data.cotizacion = parseInt(cot)
        }

        if (fInicio === undefined) {
            data.fechaInicio = fechaInicio
        } else {
            data.fechaInicio = fInicio
        }


        /* console.log(data); */

        axios.put(`https://tfi-admrec.herokuapp.com/proyectos/${proyectoId}`, data).then((response) => {

            Swal.fire({
                title: 'Proyecto Actualizado Correctamente',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        });
    }

    return (

        <div className='container-fluid rounded '>

            <div className="mt-5 mb-5 ms-5 me-5">

                <div className="row ms-0 me-0 bg-dark text-white" style={{ borderRadius: '20px' }}>

                    <div className="col-md-5" >
                        <div className="d-flex flex-column align-items-center">
                            <img className="mt-4" width="150px" src={`../assets/p3.svg`} alt='Logo Perfil' />
                            <h2 className="font-weight-bold mt-4 fst-italic">{nombre}</h2>
                            <h2 className='mt-3 fst-italic'><i className="far fa-hourglass"></i> {duracion}</h2>
                            {
                                (!actualizarState)
                                    ?
                                    (
                                        <div className="col-md-11 mt-4 mb-3 form-outline form-white">
                                            <textarea name="descripcion" value={descripcion} disabled className="form-control form-control-lg bg-secondary text-white" rows='4' placeholder='Agregue una descripcion detallada'></textarea>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="col-md-11 mt-4 mb-3 form-outline form-white">
                                            <textarea name="des" value={des} className="form-control form-control-lg" rows='4' onChange={handleInputChange}></textarea>
                                        </div>
                                    )

                            }

                        </div>
                        <div >
                            <div className='d-flex justify-content-center mb-5'>
                                <span className="fs-3 mt-2">Cliente Asociado</span>
                                <input
                                    type="text"
                                    className="ms-3 form-control-lg text-center bg-secondary fw-bold text-white"
                                    placeholder='Cliente...'
                                    name='searchFilter'
                                    disabled
                                    value={cliente.apellidoyNombre}
                                />
                            </div>
                            <hr />
                            <div className=" text-center d-flex flex-column align-items-center">
                                <hr />
                                <Link className='btn btn-outline-light w-50 mb-4' to={`/cli/${ClienteId}`}>Ver Cliente Asociado</Link>
                                <button className='btn btn-outline-light w-50 mb-4' onClick={handleFacturaRedirect}>Ver Factura</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7 border-start border-secondary">
                        <div className="p-3 py-5">
                            <div className="mb-5 ms-2">
                                <h2 className='text-center'>Datos del Proyecto</h2>
                                <hr />
                            </div>

                            {
                                (!actualizarState)
                                    ?
                                    (
                                        <div className="row mt-1 ms-5 me-5">
                                            <div className="col-md-12 mb-3">
                                                <span className="fs-5">Nombre del Proyecto</span>
                                                <input type="text" className="form-control" disabled value={nombre} />
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <span className="fs-5">Duracion</span>
                                                <input type="text" className="form-control" disabled value={duracion} />
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <span className="fs-5">Cotizacion ($)</span>
                                                <input type="text" className="form-control" disabled value={cotizacion} />
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <span className="fs-5">Fecha de Inicio</span>
                                                <input type="text" className="form-control" disabled value={fechaInicio} />
                                            </div>

                                            {
                                                (proyecto.estado === 'Completado')
                                                    ?
                                                    (
                                                        <div className="col-md-12 mb-5">
                                                            <span className="fs-5">Fecha de Finalizacion</span>
                                                            <input type="text" className="form-control" disabled value={fechaFinValue} />
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div className="col-md-12 mb-5">
                                                            <span className="fs-5">Fecha de Finalizacion (Aproximado)</span>
                                                            <input type="text" className="form-control" disabled value={fechaFinValue} />
                                                        </div>
                                                    )
                                            }



                                            <div className="col-md-12 mb-5">
                                                <div className='row'>
                                                    <div className='col-3 text-center mt-2'>
                                                        <span className="fs-5">Estado</span>
                                                    </div>
                                                    <div className='col-6'>
                                                        <div className='mt-1 fw-bold text-center text-white'>
                                                            {
                                                                (estado === 'Desarrollo')
                                                                    ?
                                                                    (
                                                                        <input type="text" disabled className="form-control bg-warning fw-bold text-center " value={estado} />
                                                                    )
                                                                    :
                                                                    (
                                                                        <input type="text" disabled className="form-control bg-success fw-bold text-white text-center " value={estado} />
                                                                    )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <button className="btn btn-info w-100" type="button" onClick={() => { setActualizarState(!actualizarState) }}>Editar Proyecto</button>
                                            </div>
                                            <div className="col-md-6">
                                                <button className='btn btn-outline-danger w-100' onClick={handleDelete}> Eliminar Proyecto </button>
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="row mt-1 ms-5 me-5">
                                            <div className="col-md-12 mb-3">
                                                <span className="fs-5">Nombre del Proyecto</span>
                                                <input type="text" className="form-control" name='nom' value={nom} onChange={handleInputChange} />
                                            </div>

                                            {
                                                (proyecto.estado === 'Completado')
                                                    ?
                                                    (
                                                        <div className="col-md-12 mb-3">
                                                            <span className="fs-5">Duracion</span>
                                                            <input type="text" className="form-control bg-secondary fw-bold" value={dur} disabled />
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div className="col-md-12 mb-3">
                                                            <span className="fs-5">Duracion</span>
                                                            <input type="text" className="form-control" name='dur' value={dur} onChange={handleInputChange} />
                                                        </div>
                                                    )
                                            }


                                            <div className="col-md-12 mb-3">
                                                <span className="fs-5">Cotizacion ($)</span>
                                                <input type="text" onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }} className="form-control" name='cot' value={cot} onChange={handleInputChange} />
                                            </div>

                                            {
                                                (proyecto.estado === 'Completado')
                                                    ?
                                                    (
                                                        <div className="col-md-12 mb-3">
                                                            <span className="fs-5">Fecha de Inicio</span>
                                                            <input type="date" className="form-control bg-secondary fw-bold" value={fInicio} disabled />
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div className="col-md-12 mb-3">
                                                            <span className="fs-5">Fecha de Inicio</span>
                                                            <input type="date" className="form-control" name='fInicio' value={fInicio} onChange={handleInputChange} />
                                                        </div>
                                                    )
                                            }

                                            {
                                                (proyecto.estado === 'Completado')
                                                    ?
                                                    (
                                                        <div className="col-md-12 mb-5">
                                                            <span className="fs-5">Fecha de Finalizacion</span>
                                                            <input type="date" className="form-control bg-secondary fw-bold" value={fechaFinValue} disabled />
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div className="col-md-12 mb-5">
                                                            <span className="fs-5">Fecha de Finalizacion</span>
                                                            <input type="date" className="form-control" value={fechaFinValue} onChange={(e) => { setFechaFinValue(e.target.value) }} />
                                                        </div>
                                                    )
                                            }

                                            <div className="col-md-12 mb-5">
                                                <div className='row'>
                                                    <div className='col-3 text-center mt-2'>
                                                        <span className="fs-5">Estado</span>
                                                    </div>
                                                    <div className='col-6'>
                                                        <Select
                                                            className='mt-1 fw-bold text-center text-white'
                                                            options={Estados}
                                                            defaultValue={defaultLabel}
                                                            onChange={(e) => { setOptionValue(e.value) }}
                                                            styles={customStyles}
                                                            isSearchable={false}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <button className="btn btn-warning w-100" type="button" onClick={() => { setActualizarState(!actualizarState) }}>Cancelar Edicion </button>
                                            </div>
                                            <div className="col-md-6">
                                                <button className='btn btn-success w-100' onClick={handleUpdate}> Confirmar Edicion </button>
                                            </div>
                                        </div>
                                    )
                            }

                        </div>
                    </div>

                </div>

            </div >
        </div >


    )
}


/*

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

    const customStylesFecha = {
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'black' : 'black',
            padding: 12,
        })
    }


<div className="col-md-6 mb-3">
    <span className="fs-5">Duracion</span>
    <input
        type="text"
        className="form-control text-center form-outline form-white mb-4"
        name='dur'
        value={dur}
        onChange={handleInputChange}
    />
</div>

<div className='col-6'>
    <Select
        className='mt-1 fw-bold text-center'
        options={Fechas}
        onChange={(e) => { setOptionValue(e.value) }}
        styles={customStylesFecha}
        isSearchable={false}
    />
</div>


*/