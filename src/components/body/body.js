import React, {useContext, useEffect, useReducer, useState} from 'react';
import socketService from "../../services/socket-service";
import styled from 'styled-components'

import {useDispatch, useSelector} from "react-redux";
import {showKeyboard, hideKeyboard, setBoolParameter, changeGlobalColor, changePhase, testDispatch} from "../../actions";

import {VdsSwitch} from '../../actions/parameters'
import { ChromePicker } from 'react-color';

import VidgetInputOutput from "../vidget-input-output";
import Tank from "../tank";
import Lamp from "../lamp";
import NumIndicator from "../num-indicator";
import './body.css';

const Button = styled.div`
 width: 100px;
 height: 50px;
 background-color: rgba(90,90,90,0.57);
 margin-bottom: 10px;
`;

const Body = () => {
    const [selectorPrepare, SetselectorPrepare] = useState(false);
    const dispatch = useDispatch();
    // const {SocketEmmit} = useContext(MyContext);
    const color = useSelector(state => state.mainKeeper.globalColor);
    const vds_fr_feedback = useSelector(state => state.analogParametersKeeper.vds_fr_feedback);
    const vds_status_feedback = useSelector(state => state.analogParametersKeeper.vds_status_feedback);

    return (
        <div className="body">
            <div>
                <NumIndicator/>
                <VidgetInputOutput keeper='analogParametersKeeper' parameter='temp_set_point' title='Подготовка'
                min={0} max={100} top={300} left={300}/>
                <VidgetInputOutput parameter='increment_value' title='modbus' keeper='analogParametersKeeper'/>
                <Button text="lamp" onClick={() => dispatch(setBoolParameter())}/>
                <Tank parameter='temp_set_point'/>
                <Lamp parameters={{parameter : 'lamp_test', keeper : 'analogParametersKeeper'}} />
                <Lamp parameters={{parameter : 'lamp_test_gpio', keeper : 'analogParametersKeeper'}} />
            </div>

            <div>
                <Button onClick={() => dispatch(VdsSwitch())}>on/off</Button>
                <Lamp parameters={{parameter : 'vds_switch', keeper : 'analogParametersKeeper'}} />

                <Button onClick={()=>dispatch(showKeyboard({startValue: 0, min: 0, max:100,
                    top: 200, left: 500, func: (input) => {socketService.SocketEmmit('vds_set_fr', input)}}))}>fr</Button>

                <Button>fr {vds_fr_feedback}</Button>
                <Button>status {vds_status_feedback}</Button>

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

                <Button onClick={()=>dispatch(showKeyboard({startValue: 0, min: 0, max:9999999,
                    top: 300, left: 1200, func: (input) => {socketService.SocketEmmit('test_range', input)}}))}>Range</Button>
                <Button onClick={()=>dispatch(showKeyboard({startValue: 0, min: 0, max:9999999,
                    top: 300, left: 1200, func: (input) => {socketService.SocketEmmit('test_frequency', input)}}))}>Frequency</Button>
                <Button onClick={()=>dispatch(showKeyboard({startValue: 0, min: 0, max:9999999,
                    top: 300, left: 1200, func: (input) => {socketService.SocketEmmit('test_value', input)}}))}>Value</Button>

            </div>
            <div>
                <div>vds<Lamp parameters={{parameter : 'stop', keeper : 'PhasesKeeper'}} /></div>
                <div>cooler<Lamp parameters={{parameter : 'stop', keeper : 'PhasesKeeper'}} /></div>
                <div>blades<Lamp parameters={{parameter : 'stop', keeper : 'PhasesKeeper'}} /></div>
                <Button>heat {vds_fr_feedback}</Button>
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
