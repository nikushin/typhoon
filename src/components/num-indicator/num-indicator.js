import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NumericInput } from "@blueprintjs/core";
import './num-indicator.css';
import {showKeyboard} from "../../actions";

const NumIndicator = () =>  {
    const counter = useSelector(state => state.analogParametersKeeper.temp_set_point);
    const dispatch = useDispatch();
    const showKeyBoard = () => {dispatch(showKeyboard('temp_set_point'))};
    return (
        <div>
            <NumericInput
                disabled = {false}
                value = {counter}
                onFocus={showKeyBoard}
                buttonPosition={'none'}
            />
        </div>
    )

};

export default NumIndicator;
