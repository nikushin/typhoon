import React, {useEffect, useState} from 'react';
import './keyboard-num.css'

import {useDispatch, useSelector} from "react-redux";
import {setKeyboardParameter} from "../../actions";


const KeyboardNum = () => {

  const [Input, setInput] = useState('');
  const keyboardOpen = useSelector(state => state.KeyboardDisplayKeeper.showKeyboard);
  const dispatch = useDispatch();

  const onKeyPress = (button) => {
    if (button === "enter") {
      dispatch(setKeyboardParameter(Input));
      setInput('');
    }
    console.log(button);
  };


  const keyboardOptions = {
    layout: {
      default: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        ['backspace', 0, 'enter'],
      ]
    },
    display: {
      'backspace': '⌫',
      'enter': '✔'
    }
  };
  const buttons = keyboardOptions.layout.default.map((button_row) =>
    <div>
      {button_row.map((button) =>
        <button onClick={() => onKeyPress(button)}>
          {Object.keys(keyboardOptions.display).map(key => {
              // for (let i = 0; i < Object.keys(keyboardOptions.display).length; i++) {
              //
              // }
              if (button === key) {
                return keyboardOptions.display[key]
              } else {
                return button
              }
            }
          )}
        </button>
      )}
    </div>
  );

  return (
    <div className={`keyboardContainer ${keyboardOpen ? "" : "hidden"}`}>
      <div className={`hg-theme-default hg-button`} data-placeholder="Enter">
        {Input}
      </div>
      {buttons}
    </div>
  );
};

export default KeyboardNum
