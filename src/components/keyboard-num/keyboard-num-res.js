import React, {Fragment, useLayoutEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setKeyboardLetterParameter, setKeyboardParameter} from "../../actions";
import {Container, ContainerInner, Button, SvgIcon, Display} from './keyboard-num-styled'



const KeyboardNum = () => {

  const refContainer = useRef(null);
  const [Input, setInput] = useState('0');
  const [InitPress, setInitPress] = useState(false);

  const {value, top, left, min, max} = useSelector(state => state.KeyboardDisplayKeeper.num);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setInput(value)
  },[]);

  const EnterPress = () => {
    if (Input > max || Input < min) {return}
    if (Input === '') {return}
    dispatch(setKeyboardParameter(Number(Input)));
  };

  const BackspacePress = () => {
    if (!InitPress) {
      setInput('');
      setInitPress(true);
    } else {
      setInput( (i) => i.slice(0, -1) );
    }
  };

  const onKeyPress = (button) => {
    if (!InitPress) {
      setInput(button);
      setInitPress(true);
      return
    }

   if (Input.length >= max.toString().length) {
     return;
   }

   if (button === 0) {
      if (Input.slice(-1) !== '0') {
        setInput( (i) => i + button);
      }
     return
    }

    if (Input.slice(0) === '0') {
      setInput(button);
      return;
    }

    setInput( (i) => i + button);

  };

  const onContainerClick = (e) => {
    if (e.target === refContainer.current) {
      dispatch(setKeyboardParameter(value));
    }
  };

  const keyboardOptions = {
      default: [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['backspace', '0', 'enter'],
      ]
  };

  const buttons = keyboardOptions.default.map((button_row, i_button_row) =>
    <div>
      {button_row.map((button, i_button) => {
          switch (button) {
            case 'enter': {
              return <Button top={i_button_row * 80 + 60} left={i_button * 80 + 25}
                             onClick={EnterPress}>
                <SvgIcon src='/img/keyboard/enter.svg'/>
              </Button>
            }
            case 'backspace': {
              return <Button top={i_button_row * 80 + 60} left={i_button * 80 + 25}
                             onClick={BackspacePress}>
                <SvgIcon src='/img/keyboard/backspace.svg'/>
              </Button>
            }
            default : {
              return <Button top={i_button_row * 80 + 60} left={i_button * 80 + 25}
                             onClick={() => onKeyPress(button)}>
                {button}
              </Button>
            }
          }
        }
      )}
    </div>
  );

  return (
    <Container onClick={onContainerClick} ref={refContainer}>
      <ContainerInner top={top} left={left}>
      <div data-placeholder="Enter">
        {Input}
      </div>
      {buttons}
      </ContainerInner>
    </Container>
  );
};

export default KeyboardNum
