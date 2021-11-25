import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

export const FacturaScreen = ({ history }) => {

    const { facturaId } = useParams();

    const [factura, setFactura] = useState({});
    const [cliente, setCliente] = useState({});
    const [detalles, setDetalles] = useState([]);

    const [clientesState, setClientesState] = useState(false);
    const [facturaState, setFacturaState] = useState(false);

    var subtotal = 0;

    useEffect(() => {

        axios.get(`https://tfi-admrec.herokuapp.com/facturas/${facturaId}`).then((response) => {
            setFactura(response.data);
            setFacturaState(true);
        });

    }, [facturaId]);

    if (facturaState) {

        axios.get(`https://tfi-admrec.herokuapp.com/clientes/rz/${factura.razonSocial}`).then((response) => {
            setCliente(response.data);
            setClientesState(true);
        });

        axios.get(`https://tfi-admrec.herokuapp.com/detalles/fac/${factura.id}`).then((response) => {
            setDetalles(response.data);
        });

        setFacturaState(false);

    }

    detalles.forEach(detalles => {
        subtotal = subtotal + detalles.subTotal;
    });

    const printDocument = () => {

        var nombre = '';

        detalles.forEach(detalles => {
            nombre = nombre + detalles.descripcion;
        });

        html2canvas(document.querySelector("#capture")).then(canvas => {

            const imgData = canvas.toDataURL('image/png');
            const pdf = jsPDF('l', 'mm', [330, 370]);
            pdf.addImage(imgData, 'PNG', 10, 10);
            /* pdf.save("factura.pdf"); */
            pdf.save(`factura${nombre}.pdf`);
        });
    }

    return (

        <div className='mt-5'>

            <div className='container d-flex justify-content-between bg-dark text-white p-3 mb-3' style={{ borderRadius: '20px' }}>
                <h2>Visor de Facturas</h2>
                <button className='btn btn-outline-light' onClick={printDocument}> EXPORTAR</button>
            </div>

            <hr className='container' />

            <div className='container bg-dark text-white mt-3 mb-5 ' style={{ borderRadius: '3%' }} id='capture'>
                <hr />

                <div className='d-flex justify-content-between'>

                    <div className='ms-5'>
                        <h1 className='mt-5 mb-3'>FACTURA TIPO {factura.tipoFactura}</h1>
                        <h5>STech Solutions</h5>
                        <h5>Bernardino Rivadavia 1050,</h5>
                        <h5>T4001 San Miguel de Tucumán, Tucumán</h5>
                    </div>

                    <img
                        src={`../assets/logo.svg`}
                        alt='Logo' className='mt-5 me-5'
                        style={{ width: '10%', height: '10%' }}
                    />

                </div>

                <div className='row mt-5 ms-5'>

                    <div className='col-4'>
                        <h3>FACTURAR A</h3>
                        <hr className='me-5' />
                        <h5>{cliente.apellidoyNombre}</h5>
                        <h5>{cliente.direccion}</h5>
                        <h5>{cliente.telefono}</h5>
                        <h5>{cliente.cuit_cuil}</h5>
                    </div>

                    <div className='col-4'>
                        <h3>ENVIAR A</h3>
                        <hr className='me-5' />
                        <h5>{cliente.apellidoyNombre}</h5>
                        <h5>{cliente.correo}</h5>
                        <h5>{cliente.telefono}</h5>
                    </div>

                    <div className='col-4'>
                        <h3>N° FACTURA:  <span className='fs-4'>ES-0{factura.id}</span> </h3>
                        {
                            (clientesState) &&
                            (
                                <h3>FECHA
                                    <span className='fs-5'>
                                        {
                                            ' : ' + factura.fecha[0] + factura.fecha[1] + factura.fecha[2] + factura.fecha[3] + factura.fecha[4] + factura.fecha[5] +
                                            factura.fecha[6] + factura.fecha[7] + factura.fecha[8] + factura.fecha[9] + '  ' + factura.fecha[11] + factura.fecha[12] +
                                            factura.fecha[13] + factura.fecha[14] + factura.fecha[15] + factura.fecha[16] + factura.fecha[17] + factura.fecha[18]
                                        }
                                    </span>
                                </h3>
                            )
                        }

                        <h3>TIPO PAGO:  <span className='fs-4'>{factura.medioPago}</span> </h3>
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
                    detalles.map(detalles => (

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
                    (factura.tipoFactura === 'A')
                        ?
                        (
                            <div className='mt-5 ms-5 text-center'>

                                <div className='row d-flex justify-content-end'>
                                    <div className='col-2'>
                                        <h3>SubTotal</h3>
                                        <hr />
                                    </div>
                                    <div className='col-2'>
                                        <h3>$ {subtotal}</h3>
                                        <hr />
                                    </div>

                                </div>

                                <div className='row d-flex justify-content-end'>
                                    <div className='col-2'>
                                        <h3>IVA {factura.iva}</h3>
                                        <hr />
                                    </div>
                                    <div className='col-2'>
                                        <h3>$ {factura.total * 0.21}</h3>
                                        <hr />
                                    </div>

                                </div>

                                <div className='row d-flex justify-content-end'>
                                    <div className='col-2'>
                                        <h3>TOTAL</h3>
                                    </div>
                                    <div className='col-2'>
                                        <h3>$ {factura.total}</h3>
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
                                        <h3> $ {factura.total}</h3>
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

        </div>


    )
}
