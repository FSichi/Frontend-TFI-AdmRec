import React from 'react'
import { NavBar } from '../components/UI/NavBar'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { ClientesList } from '../components/Clientes/ClientesList'
import { AddCliente } from '../components/Clientes/AddCliente'

import { ClienteScreen } from '../components/Clientes/ClienteScreen'
import { AddProyecto } from '../components/Proyectos/AddProyecto'
import { ProyectoList } from '../components/Proyectos/ProyectoList'
import { ProyectoScreen } from '../components/Proyectos/ProyectoScreen'
import { Dashboard } from '../components/UI/Dashboard'
import { AddFactura } from '../components/Factura/AddFactura'
import { FacturaScreen } from '../components/Factura/FacturaScreen'
import { FacturasList } from '../components/Factura/FacturasList'
import { ReportesScreen } from '../components/Reportes/ReportesScreen'

export const MainRoutes = () => {

    return (

        <Router>

            <NavBar />

            <Switch>

                <Route path="/dashboard" component={Dashboard}></Route>

                {/* RUTAS DE LOS CLIENTES */}

                <Route path="/cli/list" component={ClientesList}></Route>
                <Route path="/cli/add" component={AddCliente}></Route>
                <Route exact path="/cli/:clienteId" component={ClienteScreen}></Route>

                {/* RUTAS DE LOS PROYECTOS */}

                <Route path="/pro/list" component={ProyectoList}></Route>
                <Route path="/pro/add/:clienteId" component={AddProyecto}></Route>
                <Route exact path="/pro/:proyectoId" component={ProyectoScreen}></Route>

                {/* RUTAS DE LAS FACTURAS */}

                <Route path="/fac/list" component={FacturasList}></Route>
                <Route path="/fac/add/:clienteId" component={AddFactura}></Route>
                <Route exact path="/fac/:facturaId" component={FacturaScreen}></Route>


                {/* RUTAS DE REPORTE */}

                <Route path="/reports" component={ReportesScreen}></Route>

                <Redirect to={'/dashboard'} />

            </Switch>

        </Router>
    )
}
