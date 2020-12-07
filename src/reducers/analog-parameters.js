const analogParameters = (state, action) => {

    if (state === undefined) {
        return {
            temp_set_point: 30,
            temp_alarm_value: 555,
            increment_value: 0,
            lamp_test: false,
            heat_manual_sp: 0,
            vds_manual_sp: 0,
        };
    }

    switch (action.type) {

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
