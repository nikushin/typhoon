import React, {useEffect, useState} from 'react';
import Keyboard from 'react-simple-keyboard';
import '../../../node_modules/react-simple-keyboard/build/css/index.css';
import './keyboard-num.css'
import {useDispatch, useSelector} from "react-redux";
import {setKeyboardParameter} from "../../actions";


const KeyboardNum = () => {

    const [Input, setInput] = useState('');
    const keyboardOpen = useSelector(state => state.KeyboardDisplayKeeper.showKeyboard);
    const dispatch = useDispatch();

    const onKeyPress = (button) => {
        if (button === "{enter}") {
            dispatch(setKeyboardParameter(Input));
            setInput('');
        }
        console.log(Input);
    };


    const keyboardOptions = {
        layout: {
            default: [
                "1 2 3",
                "4 5 6",
                "7 8 9",
                "{bksp} 0 {enter}"
            ]
        },
        display: {
            '{bksp}': '⌫',
            '{enter}': '✔'
        }
    };

    return (
      <div className={`keyboardContainer ${keyboardOpen ? "" : "hidden"}`}>
          <div className={`hg-theme-default hg-button`} data-placeholder="Enter">
              {Input}
          </div>

          <Keyboard
            onChange={(e) => {
                setInput(e)
            }}
            onKeyPress={onKeyPress}
            baseClass={"keyboard-numeric"}
            {...keyboardOptions}
          />
      </div>
    );
};

export default KeyboardNum
