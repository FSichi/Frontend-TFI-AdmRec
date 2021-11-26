import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './NavBar.css'

export const NavBar = () => {

    const [navTogleCli, setNavTogleCli] = useState(false);
    const [navToglePro, setNavToglePro] = useState(false);
    const [navTogleFac, setNavTogleFac] = useState(false);
    const [navTogleHamb, setNavTogleHamb] = useState(false);

    const handleTogleCli = () => {
        setNavTogleCli(!navTogleCli);
        setNavToglePro(false);
        setNavTogleFac(false);
    }

    const handleToglePro = () => {
        setNavToglePro(!navToglePro);
        setNavTogleCli(false);
        setNavTogleFac(false);
    }

    const handleTogleFac = () => {
        setNavTogleFac(!navTogleFac);
        setNavTogleCli(false);
        setNavToglePro(false);
    }

    const handleTogleHamb = () => {
        setNavTogleHamb(!navTogleHamb);
    }

    return (
        <div className='container-fluid mt-3'>

            <nav className="navbar navbar-expand-md navbar-dark bg-dark nav rounded-3 d-none d-lg-block d-md-block">
                <div className="container-fluid">
                    <span className="navbar-brand">
                        <Link to='/dashboard'>
                            <img src={`../../assets/logo.svg`} alt='Logo' className='d-inline-block align-text-top' style={{ width: '50px', height: '50px' }} />
                        </Link>
                        <span className='ms-3' style={{ position: 'absolute', marginTop: '15px' }}>Sistema de Gestion de Clientes</span>
                    </span>
                    <button
                        className="navbar-toggler"
                        type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={handleTogleHamb}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={navTogleHamb ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'} >
                        <div className="navbar-nav me-auto mb-2 mb-lg-0">

                        </div>
                        <form className="d-flex justify-content-between itemCenter mt-md-2 mt-lg-0">
                            <div className="align-content-between">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0" onClick={handleTogleHamb}>

                                    <li className={navTogleCli ? 'nav-item dropdown show' : 'nav-item dropdown'}>
                                        <span className="nav-link dropdown-toggle" onClick={handleTogleCli}>
                                            Clientes
                                        </span>
                                        <ul className="dropdown-menu mt-4" onClick={handleTogleCli}>
                                            <li>
                                                <Link className="dropdown-item" to='/cli/add'>
                                                    <i className="fas fa-user-plus me-2"></i>
                                                    Agregar Cliente
                                                </Link>
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <Link className="dropdown-item" to='/cli/list'>
                                                    <i className="fas fa-clipboard-list me-2"></i>
                                                    Listado de Clientes
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className={navToglePro ? 'nav-item dropdown show' : 'nav-item dropdown'}>
                                        <span className="nav-link dropdown-toggle" onClick={handleToglePro}>
                                            Proyectos
                                        </span>
                                        <ul className="dropdown-menu mt-4" onClick={handleToglePro}>
                                            <li>
                                                <Link className="dropdown-item" to={`/pro/add/0`}>
                                                    <i className="fab fa-ubuntu me-2"></i>
                                                    Agregar Proyecto
                                                </Link>
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <Link className="dropdown-item" to='/pro/list'>
                                                    <i className="fas fa-database me-2"></i>
                                                    Listado de Proyectos
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className={navTogleFac ? 'nav-item dropdown show' : 'nav-item dropdown'}>
                                        <span className="nav-link dropdown-toggle" onClick={handleTogleFac}>
                                            Facturacion
                                        </span>
                                        <ul className="dropdown-menu mt-4" onClick={handleTogleFac}>
                                            <li>
                                                <Link className="dropdown-item" to={`/fac/add/0`}>
                                                    <i className="fas fa-file-invoice-dollar me-2"></i>
                                                    Crear Factura
                                                </Link>
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <Link className="dropdown-item" to='/fac/list'>
                                                    <i className="fas fa-clipboard-list me-2"></i>
                                                    Listado de Facturas
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/reports">Reportes</Link>
                                    </li>

                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>

        </div>
    )
}
