import React, {useContext, useEffect, useReducer, useState} from 'react';
import socketService from "../../services/socket-service";
import styled from 'styled-components'

import {useDispatch, useSelector} from "react-redux";
import {showKeyboard, hideKeyboard, setBoolParameter, changeGlobalColor, changePhase, testDispatch} from "../../actions";

import { ChromePicker } from 'react-color';
import {createSelector} from "reselect";


import VidgetInputOutput from "../vidget-input-output";
import Tank from "../tank";
import Lamp from "../lamp";
import NumIndicator from "../num-indicator";
import './body.css';

const Button = styled.div`
 width: 100px;
 height: 50px;
 background-color: rgba(90,90,90,0.57);
`;

const Body = () => {
    const [selectorPrepare, SetselectorPrepare] = useState(false);
    const dispatch = useDispatch();
    // const {SocketEmmit} = useContext(MyContext);
    const color = useSelector(state => state.mainKeeper.globalColor);

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

                <Button text="test"
                        onMouseDown={() => socketService.SocketEmmit('test_gpio')}>
                    Test
                </Button>


            </div>
          <div className="phases-container">

            <Button text="bPrepare" style={{backgroundColor: selectorPrepare ? "green" : "rgba(90,90,90,0.57)" }}
                    onMouseDown={() => {SetselectorPrepare((s) => {socketService.SocketEmmit('button_prepare', !s); return !s});}}>
                Prepare
            </Button>


            <Button text="bStart"
                    onMouseDown={() => socketService.SocketEmmit('button_start')}>
                Start
            </Button>
            <Button text="bStop"
                    onMouseDown={() => socketService.SocketEmmit('button_stop')}>
                Stop
          </Button>

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
