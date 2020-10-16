import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import CreateOrphanage from '../pages/CreateOrphanage';
import Landing from '../pages/Landing';
import Map from '../pages/Map';
import Orphanage from '../pages/Orphanage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';

import PrivateRoute from './Private/PrivateRoute';

const Routes: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <PrivateRoute path="/" exact component={Landing} isPrivate={true}/>
            <PrivateRoute path="/map" exact component={Map} isPrivate={true}/>
            <PrivateRoute path="/orphanages/create" exact component={CreateOrphanage} isPrivate={true}/>
            <PrivateRoute path="/orphanages/:id" exact component={Orphanage} isPrivate={true}/>
            <PrivateRoute path="/profile" exact component={Profile} isPrivate={true}/>

            <PrivateRoute path="/login" exact component={Login}/>
            <PrivateRoute path="/register" exact component={Register}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;