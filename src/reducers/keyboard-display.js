const KeyboardDisplay = (state, action) => {

    if (state === undefined) {
        return {
            showKeyboard: false,
            parameter:''
        };
    }

    switch (action.type) {
        case 'SHOW_KEYBOARD':
            return {parameter: action.payload, showKeyboard: true};

        case 'HIDE_KEYBOARD':
            return {...state.KeyboardDisplayKeeper, showKeyboard: false};

        case 'NEW_VALUE_KEYBOARD':
            state.analogParametersKeeper[state.KeyboardDisplayKeeper.parameter] = action.payload;
            return {...state.KeyboardDisplayKeeper, showKeyboard: false};

        default:
            return state.KeyboardDisplayKeeper;
    }
};

export default KeyboardDisplay;
