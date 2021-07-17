import socketService from "../services/socket-service";

const analogParameters = (state, action) => {

    if (state === undefined) {
        return {
            vds_manual_sp: 0,
            vds_prepare_fr: 0,

            cooling_time: 0,
            rest_of_cooling_time: 0,

            heat_power_indicator: [0],
            cooler_lamp: false,
            blades_lamp: false,
            cooler_manual_lamp: false,
            blades_manual_lamp: false,
            heat_lamp: false,

            temp_prepare_sp: 0,
            temp_set_point: 30,
            tempBeans: 0,
            tempAir: 0,
            ror: undefined,

            temp_alarm_value: 555,
            increment_value: 0,
            lamp_test: false,
            lamp_test_gpio: false,

            vds_switch: false,
            vds_status_feedback: false,
            vds_fr_feedback: 0,
            background_data: {
                p0:0, tsp:0, t:0, kt:0, vsp:0, v:0, kv:0, asp:0, a:0, ka:0, t_summ:0, v_summ:0, a_summ:0,
            }
        };
    }

    switch (action.type) {

        case 'MEMORY_CHANGE' :
            // console.log(action.payload);
            if (action.payload.lamps !== undefined) {
                if (action.payload.lamps.vds_lamp !== undefined)
                {state.analogParametersKeeper.vds_switch = action.payload.lamps.vds_lamp}
                if (action.payload.lamps.cooler_lamp !== undefined)
                {state.analogParametersKeeper.cooler_lamp = action.payload.lamps.cooler_lamp}
                if (action.payload.lamps.cooler_manual_lamp  !== undefined)
                {state.analogParametersKeeper.cooler_manual_lamp = action.payload.lamps.cooler_manual_lamp}
                if (action.payload.lamps.blades_lamp  !== undefined)
                {state.analogParametersKeeper.blades_lamp = action.payload.lamps.blades_lamp}
                if (action.payload.lamps.blades_manual_lamp !== undefined)
                {state.analogParametersKeeper.blades_manual_lamp = action.payload.lamps.blades_manual_lamp}
            }
            if (action.payload.heat_power_indicator !== undefined)
            {
                state.analogParametersKeeper.heat_power_indicator = Object.assign([], [action.payload.heat_power_indicator]);
            }
            if (action.payload.heat_lamp !== undefined)
            {state.analogParametersKeeper.heat_lamp = action.payload.heat_lamp}

            if (action.payload.manual !== undefined)
            {
                if (action.payload.manual.on !== undefined) {
                    state.ManualKeeper.on = action.payload.manual.on;
                }
                if (action.payload.manual.cooler !== undefined) {
                    state.ManualKeeper.cooler = action.payload.manual.cooler;
                }
                if (action.payload.manual.blades !== undefined) {
                    state.ManualKeeper.blades = action.payload.manual.blades;
                }
                if (action.payload.manual.vds !== undefined) {
                    state.ManualKeeper.vds = action.payload.manual.vds;
                }
                if (action.payload.manual.heat !== undefined) {
                    state.ManualKeeper.heat = action.payload.manual.heat;
                }
            }
            if (action.payload.background_data !== undefined) {
                state.analogParametersKeeper.background_data.p0 =  action.payload.background_data.p0;
                state.analogParametersKeeper.background_data.tsp =  action.payload.background_data.tsp;
                state.analogParametersKeeper.background_data.t =  action.payload.background_data.t;
                state.analogParametersKeeper.background_data.vsp =  action.payload.background_data.vsp;
                state.analogParametersKeeper.background_data.v =  action.payload.background_data.v;
                state.analogParametersKeeper.background_data.asp =  action.payload.background_data.asp;
                state.analogParametersKeeper.background_data.a =  action.payload.background_data.a;
                state.analogParametersKeeper.background_data.t_summ =  action.payload.background_data.t_summ;
                state.analogParametersKeeper.background_data.v_summ =  action.payload.background_data.v_summ;
                state.analogParametersKeeper.background_data.a_summ =  action.payload.background_data.a_summ;
            }

            return {...state.analogParametersKeeper};

        case 'RECEIVE_VDS_STATUS_FEEDBACK' :
            return {...state.analogParametersKeeper, vds_status_feedback: action.payload};

        case 'CHANGE_COEFFICIENT' :
            state.analogParametersKeeper.background_data[action.payload.type] =  action.payload.value;
            socketService.SocketEmmit('memory_change', {coefficients:{[action.payload.type]:action.payload.value}});
            return {...state.analogParametersKeeper};

        case 'RECEIVE_VDS_FR_FEEDBACK' :
            return {...state.analogParametersKeeper, vds_fr_feedback: action.payload};

        case 'VDS_SWITCH' :
            state.analogParametersKeeper.vds_switch = !state.analogParametersKeeper.vds_switch;
            socketService.SocketEmmit('vds_switch_power', state.analogParametersKeeper.vds_switch);
            return {...state.analogParametersKeeper};

        case 'COOLING_REAL_TIME_PARAMETERS':
            return {...state.analogParametersKeeper, rest_of_cooling_time: action.payload};

        case 'TEST_GPIO_BUTTON' :
            return {...state.analogParametersKeeper, lamp_test_gpio: action.payload};

        case 'NEW_VALUE' :
            const {newValue, keeper, parameter} = action.payload;
            state[keeper][parameter] = newValue;
            return {...state.analogParametersKeeper};

        case 'INCREMENT_VALUE' :
            return {...state.analogParametersKeeper,
                increment_value : action.payload};

        case 'VALUE_INIT':
            return {
                ...state.analogParametersKeeper,
                [action.payload[0]]: action.payload[1]
            };

        case 'BOOL_CHANGE':
            return {
                ...state.analogParametersKeeper,
                lamp_test: !state.analogParametersKeeper.lamp_test
            };

        default:
            return state.analogParametersKeeper;
    }
};

export default analogParameters;
