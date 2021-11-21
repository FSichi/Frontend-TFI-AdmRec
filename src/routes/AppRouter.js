import React from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom"
import { AuthRouter } from './AuthRouter'
import { MainRoutes } from './MainRoutes'


export const AppRouter = () => {
    return (
        <Router>
        <div>
            <Switch>
                
                <Route path="/auth" component={AuthRouter}/>
                <Route exact path="/dashboard" component={MainRoutes}/>

                <Redirect to={'/auth/login'} />

            </Switch>
        </div>
    </Router>
    )
}
