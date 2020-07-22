import React from 'react';
import {useDispatch, useSelector } from 'react-redux';
import './vidget-input-output.css';
import {showKeyboard} from "../../actions";

const VidgetInputOutput = ({name, title }) =>  {
    const value = useSelector(state => state.analogParametersKeeper[name]);
    const dispatch = useDispatch();

    const showKeyBoard = () => {
      dispatch(showKeyboard(name));
    };

    return (
      <div style={{margin: "5px 5px 5px 10px"}}>
        <span className={'vidget-title'}>
            {title}
        </span>

        <div onClick={showKeyBoard} className="num-indicator">
           {value}
        </div>
      </div>
    )
};

export default VidgetInputOutput;
