import React, {useEffect, useState} from 'react';
import socketService from "../../services/socket-service";
import {Container, Button} from './body_styled'
import {useDispatch, useSelector} from "react-redux";
import {
    showKeyboard,
    hideKeyboard,
    changePhase,
} from "../../actions";
import Lamp from "../lamp";

const Body = () => {
    const [selectorPrepare, SetselectorPrepare] = useState(false);
    const dispatch = useDispatch();
    const background_data = useSelector(state => state.analogParametersKeeper.background_data);
    const heat_power_indicator = useSelector(state => state.analogParametersKeeper.heat_power_indicator);

    const ChangeK = (type) => {
        dispatch(showKeyboard({startValue: background_data[type], min:0, max:5000, top:500, left:500,
            func: (value) => {
                dispatch({type: 'CHANGE_COEFFICIENT', payload: {type, value}})
            }}));
    };

    return (
        <Container>
            <div>
                <div>
                    <div>{heat_power_indicator[0]}</div>
                    <div>P</div>
                    <div>{background_data.p0}</div>
                </div>
                <div>
                    <div></div>
                    <div>t sp</div>
                    <div>{background_data.tsp.toFixed(1)}</div>
                </div>
                <div>
                    <div>{background_data.t_summ.toFixed(1)}</div>
                    <div>t</div>
                    <div>{background_data.t.toFixed(1)}</div>
                </div>
                <div>
                    <div></div>
                    <div>kt</div>
                    <div onClick={() => ChangeK('kt')}>{background_data.kt}</div>
                </div>
                <div>
                    <div></div>
                    <div>v sp</div>
                    <div>{background_data.vsp.toFixed(1)}</div>
                </div>
                <div>
                    <div>{background_data.v_summ.toFixed(1)}</div>
                    <div>v</div>
                    <div>{background_data.v.toFixed(1)}</div>
                </div>
                <div>
                    <div></div>
                    <div>kv</div>
                    <div onClick={() => ChangeK('kv')}>{background_data.kv}</div>
                </div>
                <div>
                    <div></div>
                    <div>a sp</div>
                    <div>{background_data.asp.toFixed(1)}</div>
                </div>
                <div>
                    <div>{background_data.a_summ.toFixed(1)}</div>
                    <div>a</div>
                    <div>{background_data.a.toFixed(1)}</div>
                </div>
                <div>
                    <div></div>
                    <div>ka</div>
                    <div onClick={() => ChangeK('ka')}>{background_data.ka}</div>
                </div>
            </div>
            <div>
                <div>vds<Lamp parameters={{parameter: 'vds_switch', keeper: 'analogParametersKeeper'}}/></div>
                <div>cooler<Lamp parameters={{parameter: 'cooler_lamp', keeper: 'analogParametersKeeper'}}/></div>
                <div>blades<Lamp parameters={{parameter: 'blades_lamp', keeper: 'analogParametersKeeper'}}/></div>
                <div>heat<Lamp parameters={{parameter: 'heat_lamp', keeper: 'analogParametersKeeper'}}/></div>
            </div>
            <div>
                <Button text="bPrepare" style={{backgroundColor: selectorPrepare ? "green" : "rgba(90,90,90,0.57)"}}
                        onMouseDown={() => {
                            SetselectorPrepare((s) => {
                                socketService.SocketEmmit('button_prepare', !s);
                                return !s
                            });
                        }}>
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
                <Button text="bBlades"
                        onMouseDown={() => socketService.SocketEmmit('button_blades')}>
                    Blades
                </Button>
                <Button text="bCooler"
                        onMouseDown={() => socketService.SocketEmmit('button_cooler')}>
                    Cooler
                </Button>
            </div>

            <div>
                <div>stop<Lamp parameters={{parameter: 'stop', keeper: 'PhasesKeeper'}}/></div>
                <div>prepare<Lamp parameters={{parameter: 'prepare', keeper: 'PhasesKeeper', blink: 'prepare_done'}}/>
                </div>

                <div>loading_roaster<Lamp
                    parameters={{parameter: 'loading_roaster', keeper: 'PhasesKeeper', blink: 'loading_roaster_done'}}/>
                </div>
                <div>roast<Lamp parameters={{parameter: 'roast', keeper: 'PhasesKeeper'}}/></div>
                <div>unloading_roaster<Lamp parameters={{parameter: 'unloading_roaster', keeper: 'PhasesKeeper'}}/>
                </div>
                <div>cooling<Lamp parameters={{parameter: 'cooling', keeper: 'PhasesKeeper'}}/></div>
                <div>unload_cooler<Lamp parameters={{parameter: 'unloading_cooler', keeper: 'PhasesKeeper'}}/></div>

            </div>
        </Container>
    );
};

export default Body
