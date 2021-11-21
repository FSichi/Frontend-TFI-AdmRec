import React, { useEffect, useState } from 'react'
import { ProyectosGraf } from './Grafics/ProyectosGraf'
import { contarIngresos } from '../../helpers/Contadores';
import { UsuariosGraf } from './Grafics/UsuariosGraf'
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import axios from 'axios';

export const Dashboard = () => {

    const [clientes, setClientes] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const [proyectosComplete, setProyectosComplete] = useState([]);
    const [facturas, setFacturas] = useState([]);

    const [clientesState, setClientesState] = useState(false);
    const [proyectosState, setProyectosState] = useState(false);

    useEffect(() => {

        axios.get('http://localhost:4000/general').then((response) => {
            setClientes(response.data[0]);
            setProyectos(response.data[1]);
            setFacturas(response.data[2]);
            setProyectosComplete(response.data[3]);

            setClientesState(true);
            setProyectosState(true);
        });


    }, []);

    const ingresosState = contarIngresos(facturas);

    const printDocument = (option) => {

        if (option === '1') {
            html2canvas(document.querySelector("#capture")).then(canvas => {

                const imgData = canvas.toDataURL('image/png');
                const pdf = jsPDF('l', 'mm', [130, 160]);
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("proyectosUsuarios.pdf");
            });
        }

        if (option === '2') {
            html2canvas(document.querySelector("#capture2")).then(canvas => {

                const imgData = canvas.toDataURL('image/png');
                const pdf = jsPDF('l', 'mm', [150, 300]);
                pdf.addImage(imgData, 'PNG', 10, 10);
                pdf.save("proyectosUsuarios.pdf");
            });
        }
    }

    return (

        <div className='container-fluid mt-4' >

            <div className='me-5 ms-5' >

                {/* CARDS */}

                <div className='row d-flex justify-content-between'>

                    <div className='col-lg-3 col-md-3 bg-primary text-white mt-5' style={{ borderRadius: '10px' }}>

                        <div className='row mt-4 mb-3'>
                            <div className='col-lg-6 col-md-12 d-flex flex-column align-items-center'>
                                <img src={`../assets/user.svg`} alt='Usuario' style={{ height: '100px', width: '100px' }}  />
                            </div>
                            <div className='col-lg-6 col-md-12 mt-4 d-flex flex-column align-items-center'>
                                <h2>Clientes</h2>
                                <h3>{clientes.length}</h3>

                            </div>
                        </div>

                    </div>

                    <div className='col-lg-3 col-md-3 bg-dark text-white mt-5' style={{ borderRadius: '10px' }}>

                        <div className='row mt-4 mb-3'>
                            <div className='col-lg-6 col-md-12 d-flex flex-column align-items-center'>
                                <img src={`../assets/proyect.svg`} alt='Usuario' style={{ height: '100px', width: '100px' }}  />
                            </div>
                            <div className='col-lg-6 col-md-12 mt-4 d-flex flex-column align-items-center'>
                                <h2>Proyectos</h2>
                                <h3>{proyectos.length}</h3>
                            </div>
                        </div>

                    </div>

                    <div className='col-lg-3 col-md-3 bg-warning text-dark mt-5' style={{ borderRadius: '10px' }}>

                        <div className='row mt-4 mb-3'>
                            <div className='col-lg-6 col-md-12 d-flex flex-column align-items-center'>
                                <img src={`../assets/invoice.svg`} alt='Usuario' style={{ height: '100px', width: '100px' }}  />
                            </div>
                            <div className='col-lg-6 col-md-12 mt-4 d-flex flex-column align-items-center'>
                                <h2>Facturas</h2>
                                <h3>{facturas.length}</h3>
                            </div>
                        </div>

                    </div>

                    <div className='col-lg-5 col-md-5 bg-success text-white mt-5' style={{ borderRadius: '10px' }}>

                        <div className='row mt-4 mb-3'>
                            <div className='col-lg-3 col-md-12 d-flex flex-column align-items-center'>
                                <img src={`../assets/money.svg`} alt='Usuario' style={{ height: '100px', width: '100px' }} />
                            </div>
                            <div className='col-lg-8 col-md-12 mt-4 d-flex flex-column align-items-center'>
                                <h2>Ingresos</h2>
                                <h3> $ {ingresosState}</h3>
                            </div>
                        </div>

                    </div>

                    <div className='col-lg-5 col-md-5 bg-info text-dark mt-5 ' style={{ borderRadius: '10px' }}>

                        <div className='row mt-4 mb-3'>
                            <div className='col-lg-3 col-md-12 d-flex flex-column align-items-center'>
                                <img src={`../assets/complete.svg`} alt='Usuario' style={{ height: '100px', width: '100px' }} />
                            </div>
                            <div className='col-lg-8 col-md-12 mt-4 d-flex flex-column align-items-center'>
                                <h2 className='fs-3'>Proyectos Completados</h2>
                                <h3>{proyectosComplete.length}</h3>
                            </div>
                        </div>

                    </div>

                </div>

                <hr className='mt-5' />
                <hr className='mt-5' />

                {/* GRAFICAS */}

                <div className='row mt-5 mb-5'>

                    {
                        (proyectos.length > 0)
                            ?
                            (
                                <div className='col-lg-4 col-md-12 bg-dark text-white mb-5 me-lg-5' style={{ borderRadius: '20px' }} id="capture">
                                    <div className='d-flex justify-content-between mt-3'>
                                        <h2 className=' mt-3'>Distribucion de Proyectos</h2>
                                        <button className='btn btn-outline-light' onClick={() => { printDocument('1') }}>Exportar</button>
                                    </div>
                                    <hr />
                                    <ProyectosGraf proyectos={proyectos} />
                                </div>
                            )
                            :
                            (
                                <div className='col-lg-4 col-md-12 bg-dark text-white mb-5 me-lg-5' style={{ borderRadius: '20px' }} id="capture">
                                    <div className='d-flex justify-content-between mt-3'>
                                        <h2 className='text-center mt-3'>Distribucion de los Proyectos</h2>
                                        <button className='btn btn-outline-light' onClick={() => { printDocument('1') }}>Exportar</button>
                                    </div>
                                    <hr />
                                    <h2 className='mt-5 text-center'>No hay suficientes Datos en el sistema como para generar un grafico Informativo</h2>
                                </div>
                            )
                    }



                    {
                        ((clientesState && proyectosState) && (clientes.length > 3 && proyectos.length > 6))

                            ?
                            (
                                <div className='col-lg-7 bg-dark text-white ms-lg-5 mb-5' style={{ borderRadius: '20px' }} id="capture2">
                                    <div className='d-flex justify-content-between mt-3'>
                                        <h2 className='text-center mt-3'>Usuarios con + Proyectos</h2>
                                        <button className='btn btn-outline-light' onClick={() => { printDocument('2') }}>Exportar</button>
                                    </div>
                                    <hr />
                                    <UsuariosGraf clientes={clientes} proyectos={proyectos} />
                                </div>
                            )
                            :
                            (
                                <div className='col-lg-7 bg-dark text-white ms-lg-5 mb-5' style={{ borderRadius: '20px' }} id="capture2">
                                    <div className='d-flex justify-content-between mt-3'>
                                        <h2 className='text-center mt-3'>Usuarios con + Proyectos</h2>
                                    </div>
                                    <hr className='mb-5' />
                                    <h2 className='mt-5 text-center'>No hay suficientes Datos en el sistema como para generar un grafico Informativo</h2>
                                    <h2 className='mt-5 text-center'>Agregue Clientes y Proyectos para poder realizar calculos de muestreo y su correspondiente grafica</h2>
                                </div>
                            )
                    }


                </div>

            </div>

        </div>
    )
}
