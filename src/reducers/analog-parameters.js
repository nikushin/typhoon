import socketService from "../services/socket-service";

const analogParameters = (state, action) => {

    if (state === undefined) {
        return {
            heat_manual_sp: 0,
            vds_manual_sp: 0,
            vds_prepare_fr: 0,

            cooling_time: 0,
            rest_of_cooling_time: 0,

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
        };
    }

    switch (action.type) {

        case 'RECEIVE_VDS_STATUS_FEEDBACK' :
            return {...state.analogParametersKeeper, vds_status_feedback: action.payload};

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
