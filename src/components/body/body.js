import React, {useContext, useEffect, useState} from 'react';
import NumIndicator from "../num-indicator";
import KeyboardNum from '../keyboard-num'
import { Button } from "@blueprintjs/core";
import {useDispatch, useSelector} from "react-redux";
import {showKeyboard, hideKeyboard, setBoolParameter, changeGlobalColor} from "../../actions";
import {MyContext} from '../../index.js'
import './body.css';
import VidgetInputOutput from "../vidget-input-output";
import Tank from "../tank";
import Lamp from "../lamp";
import { ChromePicker } from 'react-color';


const Body = () => {
    const dispatch = useDispatch();

    const {SocketSendMessage, socketCreat} = useContext(MyContext);
    // const value = useSelector(state => state.analogParametersKeeper.temp_set_point);
    const color = useSelector(state => state.valueKeeper.globalColor);

    // useEffect(() => {
    //     sendMessage(value)
    // });

    return (
        <div className="body">
            <div>
                <NumIndicator/>
                <VidgetInputOutput name='temp_set_point' title='Подготовка'/>
                <VidgetInputOutput name='temp_alarm_value' title={`Верхняя \n темп`}/>
                <Button icon="add" text="Show" onClick={() => dispatch(showKeyboard())}/>
                <Button icon="delete" text="Hide" onClick={() => dispatch(hideKeyboard())}/>
                <KeyboardNum />
                <Button icon="delete" text="Send" onClick={() => SocketSendMessage('hello nodeJS')}/>
                <Button icon="delete" text="Cr" onClick={socketCreat}/>
                <Button text="lamp" onClick={() => dispatch(setBoolParameter())}/>
                <Tank parameter='temp_set_point'/>

            </div>
            <div>
                <Lamp parameter='lamp_test'/>
            </div>
            <div style = {{paddingTop: "20px"}}>
                <ChromePicker
                  color = {color.st}
                  onChangeComplete = {(color) => dispatch(changeGlobalColor(color))}
                  disableAlpha = {true}
                />
            </div>
        </div>
    );
};

export default Body
