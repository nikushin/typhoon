import React, {useContext, useEffect, useReducer, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {showKeyboard, hideKeyboard, setBoolParameter, changeGlobalColor, changePhase, testDispatch} from "../../actions";
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

const selectColorExtract = state => state.mainKeeper.globalColor;
const selectColor = createSelector(selectColorExtract, (parameter) => {
  return parameter
});

const Body = () => {
    const [selectorPrepare, SetselectorPrepare] = useState(false);
    const dispatch = useDispatch();
    const {SocketEmmit, socketSendCurrentPhase} = useContext(MyContext);
    const color = useSelector(selectColor);

    return (
        <div className="body">
            <div>
                <NumIndicator/>
                <VidgetInputOutput keeper='analogParametersKeeper' parameter='temp_set_point' title='Подготовка'
                min={0} max={100} top={300} left={300}/>
                <VidgetInputOutput parameter='increment_value' title='modbus' keeper='analogParametersKeeper'/>
                <Button icon="add" text="Show" onClick={() => dispatch(showKeyboard())}/>
                <Button icon="delete" text="Hide" onClick={() => dispatch(hideKeyboard())}/>
                <Button text="lamp" onClick={() => dispatch(setBoolParameter())}/>
                <Tank parameter='temp_set_point'/>
            </div>
            <div>
                <Lamp parameters={{parameter : 'lamp_test', keeper : 'analogParametersKeeper'}} />
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

            <Button icon="add" text="test"
                    onMouseDown={() => dispatch(testDispatch())}/>

            <div>stop<Lamp parameters={{parameter : 'stop', keeper : 'PhasesKeeper'}} /></div>
            <div>prepare<Lamp parameters={{parameter : 'prepare', keeper : 'PhasesKeeper', blink : 'prepare_done'}}/></div>

            <div>loading_roaster<Lamp parameters={{parameter : 'loading_roaster', keeper : 'PhasesKeeper', blink : 'loading_roaster_done'}}/></div>
            <div>roast<Lamp parameters={{parameter : 'roast', keeper : 'PhasesKeeper'}}/></div>
            <div>unloading_roaster<Lamp parameters={{parameter : 'unloading_roaster', keeper : 'PhasesKeeper'}}/></div>
            <div>cooling<Lamp parameters={{parameter : 'cooling', keeper : 'PhasesKeeper'}}/></div>
            <div>unload_cooler<Lamp parameters={{parameter : 'unloading_cooler', keeper : 'PhasesKeeper'}}/></div>
          </div>
        </div>
    );
};

export default Body
