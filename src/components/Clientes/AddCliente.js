import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useForm } from '../../hooks/useForm';
import axios from 'axios';

export const AddCliente = ({ history }) => {

    const [listClientes, setListClientes] = useState([]);
    const [cuitState, setCuitState] = useState(false);
    const [emailState, setEmailState] = useState(false);

    useEffect(() => {
        axios.get('https://tfi-admrec.herokuapp.com/clientes').then((response) => {
            setListClientes(response.data);
        });
    }, []);

    const [formValues, handleInputChange] = useForm({
        apellidoyNombre: '',
        correo: '',
        cuit_cuil: '',
        direccion: '',
        telefono: ''
    });

    const { apellidoyNombre, correo, cuit_cuil, direccion, telefono } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (apellidoyNombre === '' || correo === '' || cuit_cuil === '' || direccion === '' || telefono === '') {
            
            Swal.fire({
                title: 'Por Favor, completa todos los campos solicitados',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            }).then((result) => {

            });

        } else {

            const data = {
                apellidoyNombre: apellidoyNombre,
                correo: correo,
                cuit_cuil: cuit_cuil,
                direccion: direccion,
                telefono: telefono
            }

            if (listClientes.length === 0) {

                axios.post('https://tfi-admrec.herokuapp.com/clientes', data).then((response) => {

                    Swal.fire({
                        title: 'Cliente Agregado Correctamente',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Continuar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            history.push('/cli/list');
                        }
                    });

                });

            } else {

                var cc = false;
                var em = false;

                listClientes.forEach(cliente => {

                    if (cliente.cuit_cuil === data.cuit_cuil) {
                        cc = true;
                    }

                    if (cliente.correo === data.correo) {
                        em = true;
                    }

                });

                if (!cc && !em) {
                    axios.post('https://tfi-admrec.herokuapp.com/clientes', data).then((response) => {

                        Swal.fire({
                            title: 'Cliente Agregado Correctamente',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                history.push('/cli/list');
                            }
                        });

                    });
                } else if (cc && !em) {
                    Swal.fire({
                        title: 'El Cuit/Cuil Ingresado ya coincide con el de un Cliente Existente.',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Continuar'
                    }).then((result) => {
                        setCuitState(cc)
                        setEmailState(em)
                    });
                } else if (em && !cc) {
                    Swal.fire({
                        title: 'El Correo Ingresado ya coincide con el de un Cliente Existente.',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Continuar'
                    }).then((result) => {
                        setCuitState(cc)
                        setEmailState(em)
                    });
                } else if (cc && em) {
                    Swal.fire({
                        title: 'El Cuit/Cuil y el Correo Ingresados ya coinciden con los de un Cliente Existente.',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Continuar'
                    }).then((result) => {
                        setCuitState(cc)
                        setEmailState(em)
                    });
                }
            }
        }



    }

    return (

        <section className="gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">

                                <form className="pb-1" onSubmit={handleRegister} autoComplete="off">

                                    <h2 className="fw-bold text-uppercase">Datos del Cliente</h2>
                                    <p className="text-white-50">Por favor Completa el formulario a continuacion con la informacion del cliente</p>
                                    <hr />

                                    <div className="form-outline form-white mb-4">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg text-center"
                                            placeholder='Nombre Completo'
                                            name='apellidoyNombre'
                                            value={apellidoyNombre}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    {
                                        (!emailState)
                                            ?
                                            (
                                                <div className="form-outline form-white mb-4">
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-lg text-center"
                                                        placeholder='Correo Electronico'
                                                        name='correo'
                                                        value={correo}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="form-outline form-white mb-4">
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-lg text-center bg-danger"
                                                        placeholder='Correo Electronico'
                                                        name='correo'
                                                        value={correo}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            )
                                    }

                                    {
                                        (!cuitState)
                                            ?
                                            (
                                                <div className="form-outline form-white mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg text-center"
                                                        placeholder='CUIT/CUIL'
                                                        name='cuit_cuil'
                                                        value={cuit_cuil}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="form-outline form-white mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg text-center bg-danger"
                                                        placeholder='CUIT/CUIL'
                                                        name='cuit_cuil'
                                                        value={cuit_cuil}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            )
                                    }




                                    <div className="form-outline form-white mb-4">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg text-center"
                                            placeholder='Direccion'
                                            name='direccion'
                                            value={direccion}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg text-center"
                                            placeholder='Telefono'
                                            name='telefono'
                                            value={telefono}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <button
                                        className="btn btn-outline-light btn-lg px-5 mt-4"
                                        type="submit">
                                        Registrar Cliente
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
