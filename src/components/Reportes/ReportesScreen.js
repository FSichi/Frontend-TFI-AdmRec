import React, { useEffect, useState } from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from 'axios';
import Swal from 'sweetalert2'

export const ReportesScreen = () => {

    const [clientesState, setClientesState] = useState(false);
    const [proyectosState, setProyectosState] = useState(false);
    const [facturasState, setFacturasState] = useState(false);

    const [clientes, setClientes] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const [facturas, setFacturas] = useState([]);
    const [detalles, setDetalles] = useState([]);
    const [facturasComp, setFacturasComp] = useState(false);

    var facturasAll = [];

    useEffect(() => {

        axios.get('https://tfi-admrec.herokuapp.com/facturas').then((response) => {
            setFacturas(response.data);
            setFacturasComp(true);
        });

        axios.get('https://tfi-admrec.herokuapp.com/detalles').then((response) => {
            setDetalles(response.data);
        });

        axios.get('https://tfi-admrec.herokuapp.com/clientes').then((response) => {
            setClientes(response.data);
        });

        axios.get('https://tfi-admrec.herokuapp.com/proyectos').then((response) => {
            setProyectos(response.data);
        });

    }, []);

    const handleCliente = () => {
        setProyectosState(false);
        setFacturasState(false);
        setClientesState(!clientesState);

        if (clientes.length === 0) {
            Swal.fire({
                title: 'El Sistema no Posee Registros de Clientes.',
                text: 'Si piensas que es un error, por favor comunicate con un administrador',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            });

            setClientesState(false);
        }
    }

    const handleProyecto = () => {
        setClientesState(false)
        setFacturasState(false);
        setProyectosState(!proyectosState);

        if (proyectos.length === 0) {
            Swal.fire({
                title: 'El Sistema no Posee Registros de Proyectos.',
                text: 'Si piensas que es un error, por favor comunicate con un administrador',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            });

            setProyectosState(false);
        }
    }

    const handleFactura = () => {
        setClientesState(false);
        setProyectosState(false);

        if (facturasComp) {

            facturas.forEach(factura => {
                var fact = { ...factura, descripcion: [] }
                facturasAll.push(fact);
            });

            for (var i = 0; i < facturasAll.length; i++) {
                // eslint-disable-next-line no-loop-func
                detalles.forEach(detalle => {
                    if (detalle.FacturaId === facturasAll[i].id) {

                        facturasAll[i].descripcion.push(detalle.descripcion);
                    }
                });
            }

            setFacturas(facturasAll);
        }

        setFacturasState(!facturasState);

        if (facturas.length === 0) {
            Swal.fire({
                title: 'El Sistema no Posee Registros de Facturas.',
                text: 'Si piensas que es un error, por favor comunicate con un administrador',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            });

            setFacturasState(false);
        }

    }

    return (
        <div className='container-fluid mt-4'>

            <div className='me-5 ms-5' >

                {/* CARDS MODIFY */}
                <div className='row d-flex justify-content-between'>

                    <div className='col-lg-3 col-md-3 bg-dark text-white mt-5' style={{ borderRadius: '10px' }}>

                        <div className='row mt-4 mb-3'>
                            <div className='col-lg-6 col-md-12 text-center'>
                                <img src={`../assets/user.svg`} alt='Usuario' style={{ height: '100px', width: '100px' }} />
                            </div>
                            <div className='col-lg-6 col-md-12 mt-md-4 mt-lg-2 text-center'>
                                <h2>Usuarios</h2>
                                {
                                    (!clientesState)
                                        ? (<button className='btn btn-outline-light' onClick={handleCliente}>Preparar Reporte</button>)
                                        : (<button className='btn btn-outline-light' onClick={handleCliente}>Cancelar Reporte</button>)
                                }
                            </div>
                        </div>

                    </div>

                    <div className='col-lg-3 col-md-3 bg-dark text-white mt-5' style={{ borderRadius: '10px' }}>

                        <div className='row mt-4 mb-3'>
                            <div className='col-lg-6 col-md-12 text-center'>
                                <img src={`../assets/proyect.svg`} alt='Usuario' style={{ height: '100px', width: '100px' }} />
                            </div>
                            <div className='col-lg-6 col-md-12 mt-md-4 mt-lg-2 text-center'>
                                <h2>Proyectos</h2>
                                {
                                    (!proyectosState)
                                        ? (<button className='btn btn-outline-light' onClick={handleProyecto}>Preparar Reporte</button>)
                                        : (<button className='btn btn-outline-light' onClick={handleProyecto}>Cancelar Reporte</button>)
                                }
                            </div>
                        </div>

                    </div>

                    <div className='col-lg-3 col-md-3 bg-dark text-white mt-5' style={{ borderRadius: '10px' }}>

                        <div className='row mt-4 mb-3'>
                            <div className='col-lg-6 col-md-12 text-center'>
                                <img src={`../assets/invoice.svg`} alt='Usuario' style={{ height: '100px', width: '100px' }} />
                            </div>
                            <div className='col-lg-6 col-md-12 mt-md-4 mt-lg-2 text-center'>
                                <h2>Facturas</h2>
                                {
                                    (!facturasState)
                                        ? (<button className='btn btn-outline-light' onClick={handleFactura}>Preparar Reporte</button>)
                                        : (<button className='btn btn-outline-light' onClick={handleFactura}>Cancelar Reporte</button>)
                                }
                            </div>
                        </div>

                    </div>

                </div>

                <hr className='mt-5' />

                {
                    (clientesState && clientes.length !== 0)
                    &&
                    (
                        <div>

                            <div className='d-flex justify-content-between'>
                                <h2>Todo Listo! Exporta tu Reporte</h2>
                                <div className='mt-3'>
                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="btn btn-dark ms-3"
                                        table="tablaClientes"
                                        filename="TablaClientes"
                                        sheet="clientes"
                                        buttonText="Exportar Listado de Clientes"
                                    />
                                </div>
                            </div>


                            <table className="table table-striped table-bordered table-hover text-center mt-3" id="tablaClientes" >
                                <thead className="table-dark" >
                                    <tr>
                                        <th scope="col">NOMBRE</th>
                                        <th scope="col">CORREO</th>
                                        <th scope="col">CUIT/CUIL</th>
                                        <th scope="col">DIRECCION</th>
                                        <th scope="col">TELEFONO</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        clientes.map(cliente => (

                                            <tr key={cliente.id}>
                                                <td className='p-3'>{cliente.apellidoyNombre}</td>
                                                <td className='p-3'>{cliente.correo}</td>
                                                <td className='p-3'>{cliente.cuit_cuil}</td>
                                                <td className='p-3'>{cliente.direccion}</td>
                                                <td className='p-3'>{cliente.telefono}</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    )
                }

                {
                    (proyectosState && proyectos.length !== 0)
                    &&
                    (
                        <div>

                            <div className='d-flex justify-content-between'>
                                <h2>Todo Listo! Exporta tu Reporte</h2>
                                <div className='mt-3'>
                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="btn btn-dark ms-3"
                                        table="tablaProyectos"
                                        filename="TablaProyectos"
                                        sheet="proyectos"
                                        buttonText="Exportar Listado de Proyectos"
                                    />
                                </div>
                            </div>

                            <table className="table table-striped table-bordered table-hover text-center mt-3" id="tablaProyectos" >
                                <thead className="table-dark" >
                                    <tr>
                                        <th scope="col">NOMBRE</th>
                                        <th scope="col">DURACION</th>
                                        <th scope="col">COTIZACION</th>
                                        <th scope="col">INICIO</th>
                                        <th scope="col">FIN (APROXIMADO)</th>
                                        <th scope="col">ESTADO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        proyectos.map(proyecto => (

                                            <tr key={proyecto.id}>
                                                <td className='p-3'>{proyecto.nombre}</td>
                                                <td className='p-3'>{proyecto.duracion}</td>
                                                <td className='p-3'>{proyecto.cotizacion}</td>
                                                <td className='p-3'>{proyecto.fechaInicio}</td>
                                                <td className='p-3'>{proyecto.fechaFin}</td>
                                                <td className='p-3'>{proyecto.estado}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                }


                {
                    (facturasState && facturas.length !== 0)
                    &&
                    (
                        <div>

                            <div className='d-flex justify-content-between'>
                                <h2>Todo Listo! Exporta tu Reporte</h2>
                                <div className='mt-3'>
                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="btn btn-dark ms-3"
                                        table="tablaFacturas"
                                        filename="TablaFacturas"
                                        sheet="facturas"
                                        buttonText="Exportar Listado de Facturas"
                                    />
                                </div>
                            </div>

                            <table className="table table-striped table-bordered table-hover text-center mt-3" id="tablaFacturas" >
                                <thead className="table-dark" >
                                    <tr>
                                        <th scope="col">RAZON SOCIAL</th>
                                        <th scope="col">TIPO FACTURA</th>
                                        <th scope="col">MEDIO DE PAGO</th>
                                        <th scope="col">TOTAL</th>
                                        <th scope="col">FECHA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        facturas.map(factura => (

                                            <tr key={factura.id}>
                                                <td className=''>
                                                    {
                                                        factura.descripcion.map(proyecto => (
                                                            <p key={(Math.floor(Math.random() * (1000 - 1)) + 1)}>
                                                                {proyecto}
                                                            </p>
                                                        ))
                                                    }
                                                </td>
                                                <td className='p-3'>{factura.tipoFactura}</td>
                                                <td className='p-3'>{factura.medioPago}</td>
                                                <td className='p-3'>{factura.total}</td>
                                                <td className='p-3'>
                                                    {
                                                        factura.fecha[0] + factura.fecha[1] + factura.fecha[2] + factura.fecha[3] + factura.fecha[4] + factura.fecha[5] +
                                                        factura.fecha[6] + factura.fecha[7] + factura.fecha[8] + factura.fecha[9] + ' || ' + factura.fecha[11] + factura.fecha[12] +
                                                        factura.fecha[13] + factura.fecha[14] + factura.fecha[15] + factura.fecha[16] + factura.fecha[17] + factura.fecha[18]
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                }

            </div>

        </div>
    )
}
