import React from 'react';
import Header from "../header";
import './app.css';

import {HomePage, SettingsPage, TestPage} from  '../../pages/index'

import {useDispatch, useSelector} from "react-redux";

import Spinner from "../spinner";
import KeyboardNum from "../keyboard-num";
import KeyboardLetter from "../keyboard-letter";

const App = () => {

  const ConnectStatus = useSelector(state => state.mainKeeper.connectStatus);
  const keyboardLetterOpen = useSelector(state => state.KeyboardDisplayKeeper.letter.show);
  const keyboardNumOpen = useSelector(state => state.KeyboardDisplayKeeper.num.show);
  const selectedMenu = useSelector(state => state.mainKeeper.route.mainMenu);
  const choosePage = () => {
    switch (selectedMenu) {
      case 'home': return <HomePage/>;
      case 'settings': return <SettingsPage/>;
      case 'test': return <TestPage/>;
      default : return <div>Something wrong!</div>
    }
  };

  const body =
    <div className="app">
      {keyboardLetterOpen ? <KeyboardLetter/> : ''}
      {keyboardNumOpen ? <KeyboardNum/> : ''}
    <Header/>
      {choosePage()}
    </div>;

  return (
    ConnectStatus ? body : <Spinner/>
  );
};

export default App;
