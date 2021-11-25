import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { TablaProyectos } from '../Proyectos/TablaProyectos';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useForm } from '../../hooks/useForm';

export const ClienteScreen = ({ history }) => {

    const { clienteId } = useParams();
    const [cliente, setCliente] = useState({});
    const [proyectos, setProyectos] = useState([]);
    const [proyectoState, setProyectState] = useState(false);
    const [actualizarState, setActualizarState] = useState(false);

    useEffect(() => {

        axios.get(`https://tfi-admrec.herokuapp.com/clientes/${clienteId}`).then((response) => {
            setCliente(response.data);
        });

        axios.get(`https://tfi-admrec.herokuapp.com/proyectos/cliente/${clienteId}`).then((response) => {
            setProyectos(response.data);
        });

    }, [clienteId]);

    const { apellidoyNombre, correo, cuit_cuil, direccion, telefono } = cliente;

    const [formValues, handleInputChange] = useForm({
        nombre: apellidoyNombre,
        email: correo,
        cc: cuit_cuil,
        dir: direccion,
        phone: telefono
    });

    const { nombre, email, cc, dir, phone } = formValues;

    const handleProyectos = () => {
        setProyectState(!proyectoState);
    }

    const handleDelete = () => {

        Swal.fire({
            title: 'Estas Seguro?',
            text: "Esto eliminara al Cliente y todos sus Datos y Proyectos asociados.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {

                if (proyectos.length !== 0) {

                    axios.get(`https://tfi-admrec.herokuapp.com/general/deleteCli/${clienteId}`).then((response) => {

                        // var detalles = response.data[0]
                        var facturas = response.data[1]

                        if (response.data[0].length === 0 && response.data[1].length === 0) {
                            axios.delete(`https://tfi-admrec.herokuapp.com/clientes/${clienteId}`).then((response) => {
                                Swal.fire(
                                    'Cliente eliminado!',
                                    '',
                                    'success'
                                );
                                history.push('/cli/list');
                            });
                        }
                        else {
                            Swal.fire({
                                title: 'Se ha detectado que el Cliente tiene facturas a su nombre. Quieres continuar?',
                                text: "Esto quitara del listado a la factura correspondiente. Asegurate de que has exportado todas las facturas del cliente.",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Eliminar',
                                cancelButtonText: 'Cancelar'
                            }).then((result) => {
                                if (result.isConfirmed) {

                                    /*  
                                        detalles.forEach(detalle => {
                                            axios.delete(`https://tfi-admrec.herokuapp.com/detalles/${detalle.id}`).then((response) => {
                                    
                                            });
                                        }); 
                                    */

                                    facturas.forEach(factura => {
                                        axios.delete(`https://tfi-admrec.herokuapp.com/facturas/${factura.id}`).then((response) => {

                                        });
                                    });

                                    axios.delete(`https://tfi-admrec.herokuapp.com/clientes/${clienteId}`).then((response) => {
                                        Swal.fire(
                                            'Cliente eliminado!',
                                            '',
                                            'success'
                                        );

                                        history.push('/cli/list');
                                    });
                                }
                            });
                        }

                    });

                } else {

                    var rz = cliente.apellidoyNombre;

                    axios.get(`https://tfi-admrec.herokuapp.com/facturas/rz/${rz}`).then((response) => {

                        console.log(response.data);

                        /* Borrar Cliente */
/*                         axios.delete(`https://tfi-admrec.herokuapp.com/clientes/${clienteId}`).then((response) => {
                            Swal.fire(
                                'Cliente eliminado!',
                                '',
                                'success'
                            );
                            history.push('/cli/list');
                        }); */

                    });

                }

            }
        });
    }

    const handleUpdate = () => {

        var data = {
            id: clienteId,
            apellidoyNombre: '',
            correo: '',
            cuit_cuil: '',
            direccion: '',
            telefono: ''
        }

        if (nombre === undefined) {
            data.apellidoyNombre = apellidoyNombre
        } else {
            data.apellidoyNombre = nombre
        }

        if (email === undefined) {
            data.correo = correo
        } else {
            data.correo = email
        }

        if (cc === undefined) {
            data.cuit_cuil = cuit_cuil
        } else {
            data.cuit_cuil = cc
        }

        if (dir === undefined) {
            data.direccion = direccion
        } else {
            data.direccion = dir
        }

        if (phone === undefined) {
            data.telefono = telefono
        } else {
            data.telefono = phone
        }

        axios.put(`https://tfi-admrec.herokuapp.com/clientes/${clienteId}`, data).then((response) => {

            Swal.fire({
                title: 'Cliente Actualizado Correctamente',
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

        <div className='container-fluid rounded'>

            <div className="mt-5 mb-5 ms-5 me-md-5">

                <div className="row">

                    <div className="col-md-12 col-lg-4 bg-dark text-white me-lg-5 mb-5" style={{ borderRadius: '20px' }}>
                        <div className="d-flex flex-column align-items-center p-3 py-5">
                            <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt='Logo Perfil' />
                            <h2 className="font-weight-bold mt-4 fst-italic">{apellidoyNombre}</h2>
                            <h2 className='mt-3 fst-italic' style={{ fontSize: '1.3rem' }}><i className="fas fa-envelope"></i> {correo}</h2>
                            <h2 className='mt-3 fst-italic' style={{ fontSize: '1.3rem' }}><i className="fas fa-mobile-alt"></i> {telefono}</h2>
                            <div className="mt-3">
                                <hr />
                                <Link to={`/pro/add/${clienteId}`} className='btn btn-outline-light w-100 mb-4'>Agregar un Proyecto</Link>  {/* TENGO QUE AGREGAR REDUX PARA USAR EL CLIENTE ACTIVE Y SACAR EL VALOR ACTUAL */}

                                {
                                    (!proyectoState)
                                        ? (<button className="btn btn-success w-100" type="button" onClick={handleProyectos}>Ver Proyectos</button>)
                                        : (<button className="btn btn-danger w-100" type="button" onClick={handleProyectos}>Ocultar Proyectos</button>)

                                }
                            </div>

                        </div>
                    </div>

                    <div className="col-md-12 col-lg-7 border-right ms-lg-5 bg-dark text-white mb-lg-5" style={{ borderRadius: '20px' }}>
                        <div className="p-3 py-5">
                            <div className="mb-5 ms-2">
                                <h2 className='text-center'>Datos de Perfil</h2>
                                <hr />
                            </div>
                            {
                                (!actualizarState)
                                    ?
                                    (
                                        <div className="row mt-1 ms-5 me-5">
                                            <div className="col-md-12 mb-3">
                                                <span className="fs-5">Nombre Completo</span>
                                                <input type="text" className="form-control" name='nombre' disabled value={apellidoyNombre} />
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <span className="fs-5">Correo</span>
                                                <input type="text" className="form-control disabled" name='email' disabled value={correo} />
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <span className="fs-5">Telefono de Contacto</span>
                                                <input type="text" className="form-control" name='phone' disabled value={telefono} />
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <span className="fs-5">Direccion</span>
                                                <input type="text" className="form-control" name='dir' disabled value={direccion} />
                                            </div>
                                            <div className="col-md-12 mb-5">
                                                <span className="fs-5">Cuit /Cuil</span>
                                                <input type="text" className="form-control" name='cc' disabled value={cuit_cuil} />
                                            </div>
                                            <div className="col-md-6">
                                                <button className="btn btn-info w-100" type="button" onClick={() => { setActualizarState(!actualizarState) }}>Actualizar Perfil</button>
                                            </div>
                                            <div className="col-md-6">
                                                <button className='btn btn-outline-danger w-100' onClick={handleDelete}> Borrar Cliente </button>
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="row mt-1 ms-5 me-5">
                                            <div className="col-md-12 mb-3">
                                                <span className="fs-5">Nombre Completo</span>
                                                <input type="text" className="form-control" name='nombre' value={nombre} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <span className="fs-5">Correo</span>
                                                <input type="text" className="form-control" name='email' value={email} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <span className="fs-5">Telefono de Contacto</span>
                                                <input type="text" className="form-control" name='phone' value={phone} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <span className="fs-5">Direccion</span>
                                                <input type="text" className="form-control" name='dir' value={dir} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-md-12 mb-5">
                                                <span className="fs-5">Cuit /Cuil</span>
                                                <input type="text" className="form-control" name='cc' value={cc} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-md-6">
                                                <button className='btn btn-warning w-100' onClick={() => { setActualizarState(!actualizarState) }}> Cancelar Actualizacion </button>
                                            </div>
                                            <div className="col-md-6">
                                                <button className="btn btn-success w-100" type="button" onClick={handleUpdate}>Confirmar Actualizacion</button>
                                            </div>
                                        </div>
                                    )
                            }


                        </div>
                    </div>

                </div>

            </div>

            {
                (proyectoState) &&
                (
                    <div className="ms-4 me-5 mb-5">
                        <hr />
                        <TablaProyectos proyectos={proyectos} />
                    </div>
                )
            }


        </div>

    )
}
