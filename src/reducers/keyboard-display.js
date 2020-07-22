import {useContext} from "react";

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
            return {...state, showKeyboard: false};

        case 'NEW_VALUE_KEYBOARD':
            state.analogParametersKeeper[state.KeyboardDisplayKeeper.parameter] = action.payload;
            return {...state};

        default:
            return state.KeyboardDisplayKeeper;
    }
};

export default KeyboardDisplay;
