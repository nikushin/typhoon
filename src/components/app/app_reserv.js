import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from "../header";
import Bottom from "../bottom";
import './app.css';

import {HomePage, SettingsPage, TestPage} from  '../../pages/index'

import {useSelector} from "react-redux";

import Spinner from "../spinner";
import KeyboardNum from "../keyboard-num";
import KeyboardLetter from "../keyboard-letter";

const App = () => {

  const ConnectStatus = useSelector(state => state.mainKeeper.connectStatus);
  const keyboardOpen = useSelector(state => state.KeyboardDisplayKeeper.showKeyboardLetter);


  const body =
    <div className="app">
      <KeyboardNum/>
      {keyboardOpen ? <KeyboardLetter /> : ''}
    <Header/>
    <Switch>
      <Route path="/home" component={HomePage}/>
      <Route path="/settings" component={SettingsPage}/>
      <Route path="/test" component={TestPage}/>
      <Redirect from='/' to='/home'/>
    </Switch>
    <Bottom/>
  </div>;

  return (
    ConnectStatus ? body : <Spinner/>
  );
};

export default App;
