import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { generarFactura, generarDetallesFactura, obtenerTipoFactura } from '../../helpers/Factura';

export const FacturaGenerated = ({ proyectos, cliente, tipoFac, medioPago, history }) => {

    const [tipoFactura, setTipoFactura] = useState('');

    useEffect(() => {
        setTipoFactura(obtenerTipoFactura(tipoFac));
    }, [tipoFac])

    const { nombre, correo, cuit_cuil, direccion, telefono } = cliente;

    const factura = generarFactura(proyectos, cliente, tipoFac, medioPago);

    const detallesFac = generarDetallesFactura(proyectos, cliente, factura);

    var subtotal = 0;

    detallesFac.forEach(detalles => {
        subtotal = subtotal + parseInt(detalles.subTotal);
    });

    const handleGenerateAndSave = () => {

        Swal.fire({
            title: 'Estas Seguro?',
            text: 'Ya verificaste que los datos esten correctamente insertados?. La factura no podra eliminarse mas adelante.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2ac979',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar y Guardar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                saveFactura();
            }
        });

    }

    const generarFecha = (fecha) => {

        var today = new Date();

        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        var hh = today.getHours();
        var mn = today.getMinutes();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (hh < 10) {
            hh = '0' + hh;
        }
        if (mn < 10) {
            mn = '0' + mn;
        }

        var fechaFinal = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mn;

        return fechaFinal;

    }

    const saveFactura = () => {

        const fechaFinal = generarFecha(factura.fecha);

        var data = {
            total: factura.total,
            medioPago: factura.medioPago,
            fecha: fechaFinal,
            razonSocial: cliente.apellidoyNombre,
            iva: factura.iva,
            montoIva: factura.montoIVA,
            tipoFactura: factura.TipoFactura
        }

        axios.post('https://tfi-admrec.herokuapp.com/facturas', data).then((response) => {

            saveDetalles();

        });

    }

    const saveDetalles = () => {

        var detalles = detallesFac;
        var detallesFinal = [];
        var fact = [];

        var data = {
            cantidad: 0,
            descripcion: '',
            precioUnitario: 0,
            subTotal: 0,
            FacturaId: 0,
            ProyectoId: 0,
        }

        axios.get('https://tfi-admrec.herokuapp.com/facturas').then((response) => {

            fact = response.data;

            detalles.forEach(detalle => {

                data = {
                    cantidad: detalle.cantidad,
                    descripcion: detalle.descripcion,
                    precioUnitario: detalle.precioUnitario,
                    subTotal: detalle.subTotal,
                    FacturaId: fact[fact.length - 1].id,
                    ProyectoId: detalle.idProyecto,
                }

                detallesFinal.push(data);

            });

            detallesFinal.forEach(detalle => {

                axios.post('https://tfi-admrec.herokuapp.com/detalles', detalle).then((response) => {

                    console.log('Guarde: ', detalle);

                });

            });

            Swal.fire({
                title: 'Factura Agregada Correctamente',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continuar'
            }).then((result) => {
                if (result.isConfirmed) {
                    history.push('/fac/list');
                }
            });

        });
    }

    return (

        <div className='container bg-dark text-white mt-5 mb-5 ' style={{ borderRadius: '3%' }}>
            <hr />

            {/* INFO */}
            <div className='mt-5'>
                <div className='col-12 d-flex justify-content-center align-items-center'>
                    <button className="btn btn-outline-light w-25 mb-5"
                        type="button"
                        onClick={handleGenerateAndSave}
                    >
                        Crear y Guardar Factura
                    </button>
                </div>
                <hr />
            </div>

            {/* FACTURA */}

            <div className='d-flex justify-content-between'>

                <div className='ms-5'>
                    <h1 className='mt-5 mb-3'>FACTURA TIPO {factura.TipoFactura}</h1>
                    <h5>STech Solutions</h5>
                    <h5>Bernardino Rivadavia 1050,</h5>
                    <h5>T4001 San Miguel de Tucumán, Tucumán</h5>
                </div>
                
                <img
                    src={`../../assets/logo.svg`}
                    alt='Logo' className='mt-5 me-5'
                    style={{ width: '10%', height: '10%' }}
                />

            </div>

            {/* CONTENIDO DE FACTURAR A - ENVIAR A  - NRO DE FACTURA  */}

            <div className='row mt-5 ms-5'>

                <div className='col-4'>
                    <h3>FACTURAR A</h3>
                    <hr className='me-5' />
                    <h5>{nombre}</h5>
                    <h5>{direccion}</h5>
                    <h5>{telefono}</h5>
                    <h5>{cuit_cuil}</h5>
                </div>

                <div className='col-4'>
                    <h3>ENVIAR A</h3>
                    <hr className='me-5' />
                    <h5>{nombre}</h5>
                    <h5>{correo}</h5>
                    <h5>{telefono}</h5>
                </div>

                <div className='col-4'>
                    <h3>N° FACTURA:  <span className='fs-5'>ES-0.</span> </h3>
                    <h3>FECHA:  <span className='fs-5'>{factura.fecha}</span></h3>
                    <h3>TIPO PAGO:  <span className='fs-4'>{factura.medioPago}</span> </h3>
                    {/* <h3>VENCIMIENTO:  <span className='fs-5'>{fecha}</span> </h3> */}
                </div>
            </div>

            <div className='border-top border-bottom border-danger ms-5 me-5 mt-5'>

                <div className='row mt-3 mb-3 text-center'>

                    <div className='col-3'>
                        CANT.
                    </div>
                    <div className='col-3'>
                        DESCRIPCION
                    </div>
                    <div className='col-3'>
                        PRECIO UNITARIO
                    </div>
                    <div className='col-3'>
                        IMPORTE
                    </div>

                </div>

            </div>

            {
                detallesFac.map(detalles => (

                    <div className='row ms-5 me-5 mt-3 text-center' key={detalles.id}>

                        <hr />

                        <div className='col-3'>
                            {detalles.cantidad}
                        </div>
                        <div className='col-3'>
                            {detalles.descripcion}
                        </div>
                        <div className='col-3'>
                            {detalles.precioUnitario}
                        </div>
                        <div className='col-3'>
                            {detalles.cantidad * detalles.precioUnitario}
                        </div>

                        <hr className='mt-2' />
                    </div>

                ))
            }

            {
                (tipoFactura === 'A')
                    ?
                    (
                        <div className='mt-5 ms-5 text-center'>

                            <div className='row d-flex justify-content-end'>
                                <div className='col-2'>
                                    <h3>SubTotal</h3>
                                    <hr />
                                </div>
                                <div className='col-2'>
                                    <h3>{subtotal}</h3>
                                    <hr />
                                </div>
                            </div>

                            <div className='row d-flex justify-content-end'>
                                <div className='col-2'>
                                    <h3>IVA {factura.iva}</h3>
                                    <hr />
                                </div>
                                <div className='col-2'>
                                    <h3>{(subtotal / 0.79) * 0.21}</h3>
                                    <hr />
                                </div>
                            </div>

                            <div className='row d-flex justify-content-end'>
                                <div className='col-2'>
                                    <h3>TOTAL</h3>
                                </div>
                                <div className='col-2'>
                                    <h3> $ {subtotal + ((subtotal / 0.79) * 0.21)}</h3>
                                </div>
                            </div>

                        </div>
                    )
                    :
                    (
                        <div className='mt-5 ms-5 text-center'>

                            <div className='row d-flex justify-content-end'>
                                <div className='col-2'>
                                    <h3>TOTAL</h3>
                                </div>
                                <div className='col-2'>
                                    <h3> $ {subtotal + ((subtotal / 0.79) * 0.21)}</h3>
                                </div>
                            </div>

                        </div>
                    )
            }

            <div className='mt-5 ms-5 mb-5'>

                <div className='row'>

                    <div className='col-6 mb-5 mt-5 text-center'>
                        <hr />
                        FIRMA Y SELLO DEL CLIENTE
                    </div>

                    <div className='col-5 mb-5 mt-5 ms-5'>
                        <p>Esta Factura de venta se asimila en todos sus efectos legales a una letra
                            de cambio segun el ART. 774, del codigo de comercio
                        </p>
                    </div>

                </div>

            </div>

        </div>
    )
}
