import React, {useContext, useState} from 'react';
import './keyboard-num.css'
import {MyContext} from '../../index.js'
import {useDispatch, useSelector} from "react-redux";
import {setKeyboardParameter} from "../../actions";


const KeyboardNum = () => {

  const [Input, setInput] = useState('0');

  const keyboardOpen = useSelector(state => state.KeyboardDisplayKeeper.showKeyboard);
  const parameter = useSelector(state => state.KeyboardDisplayKeeper.parameter);
  const {SocketSendMessage} = useContext(MyContext);
  const dispatch = useDispatch();

  const setOnPressEnter = () => {
    if (Input !== '') {
      console.log([parameter, Input]);
      SocketSendMessage([parameter, Input]);
      dispatch(setKeyboardParameter(Input));
    } else {
      SocketSendMessage({[parameter]:'0'});
      dispatch(setKeyboardParameter('0'));
    }
    setInput('0');
  };

  const onKeyPress = (button) => {
    if (button === "✔") {
      setOnPressEnter()
    } else if (button === "⌫") {
        setInput( (i) => i.slice(0, -1) );
    }
    else if (button === 0) {
      if (Input.slice(-1) !== '0') {
        setInput( (i) => i + button);
      }
    }
    else {
      if (Input.slice(0) === '0') {
        setInput(button);
      } else {
        setInput( (i) => i + button);
      }
    }
  };

  const keyboardOptions = {
    layout: {
      default: [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['⌫', '0', '✔'],
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
        <button className={`buttons`} onClick={() => onKeyPress(button)}>
            {button}
        </button>
      )}
    </div>
  );

  return (
    <div className={`keyboardContainer ${keyboardOpen ? "" : "hidden"}`}>
      <div data-placeholder="Enter">
        {Input}
      </div>
      {buttons}
    </div>
  );
};

export default KeyboardNum
