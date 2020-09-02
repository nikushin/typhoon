import React, {useContext, useEffect, useReducer, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {showKeyboard, hideKeyboard, setBoolParameter, changeGlobalColor, changePhase} from "../../actions";
import {MyContext} from '../../index.js'

import { ChromePicker } from 'react-color';
import {createSelector} from "reselect";


import VidgetInputOutput from "../vidget-input-output";
import Tank from "../tank";
import Lamp from "../lamp";
import NumIndicator from "../num-indicator";
import KeyboardNum from '../keyboard-num'
import './body.css';
import { Button } from "@blueprintjs/core";

// const selectOn = state => state[PhasesKeeper][parameter];

// const selectPhasesStopExtract = state => state.PhasesKeeper.stop;
// const selectPhasesStop = createSelector(selectPhasesStopExtract, (parameter) => {
//   return parameter
// });
//
// const selectPhasesPrepareExtract = state => state.PhasesKeeper.prepare;
// const selectPhasesPrepare = createSelector(selectPhasesPrepareExtract, (parameter) => {
//   return parameter
// });

const selectColorExtract = state => state.valueKeeper.globalColor;
const selectColor = createSelector(selectColorExtract, (parameter) => {
  return parameter
});

const Body = () => {
    const [selectorPrepare, SetselectorPrepare] = useState(false);
    const dispatch = useDispatch();
    const {SocketEmmit, socketSendCurrentPhase} = useContext(MyContext);
    const color = useSelector(selectColor);


  console.log('body')

    return (
        <div className="body">
            <div>
                <NumIndicator/>
                <VidgetInputOutput name='temp_set_point' title='Подготовка'/>
                <VidgetInputOutput name='increment_value' title='modbus'/>
                <Button icon="add" text="Show" onClick={() => dispatch(showKeyboard())}/>
                <Button icon="delete" text="Hide" onClick={() => dispatch(hideKeyboard())}/>
                <KeyboardNum />

                {/*<Button icon="delete" text="Send" onClick={() => SocketSendMessage('hello nodeJS')}/>*/}
                {/*<Button icon="delete" text="Cr" onClick={socketCreat}/>*/}
                <Button text="lamp" onClick={() => dispatch(setBoolParameter())}/>
                <Tank parameter='temp_set_point'/>

            </div>
            <div>
                <Lamp parameter='lamp_test' keeper='analogParametersKeeper' />
            </div>
            <div style = {{paddingTop: "20px"}}>
                <ChromePicker
                  color = {color.st}
                  onChangeComplete = {(color) => dispatch(changeGlobalColor(color))}
                  disableAlpha = {true}
                />
            </div>
          <div className="phases-container">

            <Button icon="add" text="bPrepare" style={{backgroundColor: selectorPrepare ? "green" : "white" }}
                    onMouseDown={() => {SetselectorPrepare((s) => {SocketEmmit('button_prepare', !s); return !s});}}/>
            <Button icon="add" text="bStart"
                    onMouseDown={() => SocketEmmit('button_start')}/>
            <Button icon="add" text="bStop"
                    onMouseDown={() => SocketEmmit('button_stop')}/>

            <div>stop<Lamp parameter='stop' keeper='PhasesKeeper' /></div>
            <div>prepare<Lamp parameter='prepare' keeper='PhasesKeeper' blink='prepare_done'/></div>

            <div>loading_roaster<Lamp parameter='loading_roaster' keeper='PhasesKeeper' blink='loading_roaster_done'/></div>
            <div>roast<Lamp parameter='roast' keeper='PhasesKeeper'/></div>
            <div>unloading_roaster<Lamp parameter='unloading_roaster' keeper='PhasesKeeper'/></div>
            <div>cooling<Lamp parameter='cooling' keeper='PhasesKeeper'/></div>
            <div>unload_cooler<Lamp parameter='unloading_cooler' keeper='PhasesKeeper'/></div>
          </div>
        </div>
    );
};

export default Body
