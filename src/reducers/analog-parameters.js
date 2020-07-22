const analogParameters = (state, action) => {
    if (state === undefined) {
        return {
            temp_set_point: 30,
            temp_alarm_value: 555,
            lamp_test: false
        };
    }
    switch (action.type) {

        case 'VALUE_INIT':
            console.log(action.payload);
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
