import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from "../header";
import Bottom from "../bottom";
import './app.css';

import {HomePage, SettingsPage, ManualPage} from  '../../pages/index'

import {useSelector} from "react-redux";

import Spinner from "../spinner";

const App = () => {

  const ConnectStatus = useSelector(state => state.valueKeeper.connectStatus);

  const body =
    <div className="app">
    <Header/>
    <Switch>
      <Route path="/" component={HomePage} exact />
      <Route path="/settings" component={SettingsPage}/>
      <Route path="/manual" component={ManualPage}/>
    </Switch>
    <Bottom/>
  </div>;

  return (
    ConnectStatus ? body : <Spinner/>
  );
};

export default App;
