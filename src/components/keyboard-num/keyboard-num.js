import React, {Fragment, useLayoutEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setKeyboardLetterParameter, setKeyboardParameter, hideKeyboard} from "../../actions";
import {Container, ContainerInner, Button, SvgIcon, Display} from './keyboard-num-styled'


const KeyboardNum = () => {

  const inputEl = useRef(null);
  const [CaretPos, setCaretPos] = useState(undefined);
  const refContainer = useRef(null);
  const [Input, setInput] = useState('0');

  const {startValue, top, left, min, max, func, type='simple'} = useSelector(state => state.KeyboardDisplayKeeper.num);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    inputEl.current.focus();
    if (type === 'simple') {
        setInput(startValue.toString());
        setCaretPos([0,startValue.toString().length]);
    }
    if (type === 'time') {
        const minutes = Math.floor(startValue/60);
        const seconds = startValue - minutes*60;
        setInput(minutes.toString() + ":" + ((String(seconds).length) > 1 ? '' : '0' ) + seconds.toString());
        setCaretPos([0,0]);
    }
  },[]);

    useLayoutEffect(() => {
        if (CaretPos) {
            inputEl.current.setSelectionRange(CaretPos[0], CaretPos[1])
        }
    },[CaretPos]);

  const EnterPress = () => {
      let final = undefined;
      if (type === 'simple') {
          final = Number(Input)
      }
      if (type === 'time') {
          const arr = Input.split(':');
          final = Number(arr[0])*60 + Number(arr[1])
      }

    if (final > max || Input < min) {return}
    if (final === '') {return}
    func(final);
    dispatch(hideKeyboard())
  };

  const BackspacePress = () => {

      setInput((i) => {
          if (type === 'simple') {
              let start = undefined;
              let deleteCount = undefined;
              if (inputEl.current.selectionStart !== inputEl.current.selectionEnd) {
                  start = inputEl.current.selectionStart;
                  deleteCount = inputEl.current.selectionEnd - inputEl.current.selectionStart;
              } else {
                  start = inputEl.current.selectionStart - 1;
                  deleteCount = 1;
              }
              const array = i.split('');
              array.splice(start, deleteCount);
              setCaretPos([start, start]);
              return array.join('')
          }

          if (type === 'time') {
              let start = undefined;
              let startCoret = undefined;
              const array = i.split('');
              if (array[inputEl.current.selectionStart-1] === ":") {
                  startCoret = inputEl.current.selectionStart - 2;
                  start = inputEl.current.selectionStart-2;
              } else {
                  startCoret = inputEl.current.selectionStart-1;
                  start = inputEl.current.selectionStart-1;
              }
              if (startCoret < 0) {startCoret = 0}
              array[start] = "0";
              setCaretPos([startCoret, startCoret]);
              return array.join('')
          }

      });
  };

  const onKeyPress = (button) => {
      setInput((i) => {
          const array = i.split('');
          if (type === 'simple') {
              if (inputEl.current.selectionStart !== inputEl.current.selectionEnd) {
                  const start = inputEl.current.selectionStart;
                  const startCoret = inputEl.current.selectionStart + 1;
                  const deleteCount = inputEl.current.selectionEnd - inputEl.current.selectionStart;
                  array.splice(start, deleteCount, button);
                  setCaretPos([startCoret, startCoret]);
                  return array.join('')
              } else {
                  if (Input.length >= max.toString().length) {return i;}
                  if (button === '0') {if (i === '0') {return i}}
                  if (i === '0') {setInput(button); return;}
                  const start = inputEl.current.selectionStart + 1;
                  const startCoret = start;
                  array.splice(start, 0, button);
                  setCaretPos([startCoret, startCoret]);
                  return array.join('')
              }
            }

          if (type === 'time') {
              let startCoret = undefined;
             if (inputEl.current.selectionStart === i.length) {
                 return i
             }
              if (array[inputEl.current.selectionStart+1] === ":") {
                  startCoret = inputEl.current.selectionStart+2;
              } else {
                  startCoret = inputEl.current.selectionStart+1;
              }
              array[inputEl.current.selectionStart] = button;
              setCaretPos([startCoret, startCoret]);
              return array.join('')
          }

      })
  };

    const onBlur = () => {
        inputEl.current.focus();
    };

  const onContainerClick = (e) => {
    if (e.target === refContainer.current) {dispatch(hideKeyboard())}
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
              return <Button top={i_button_row * 110 + 110} left={i_button * 110 + 30}
                             onClick={EnterPress}>
                <SvgIcon src='/img/keyboard/enter.svg'/>
              </Button>
            }
            case 'backspace': {
              return <Button top={i_button_row * 110 + 110} left={i_button * 110 + 30}
                             onClick={BackspacePress}>
                <SvgIcon src='/img/keyboard/backspace.svg'/>
              </Button>
            }
            default : {
              return <Button top={i_button_row * 110 + 110} left={i_button * 110 + 30}
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
      <ContainerInner top={top} left={left} onBlur={onBlur}>
          <Display ref={inputEl} value={Input} placeholder={"Enter"}/>

      {buttons}
      </ContainerInner>
    </Container>
  );
};

export default KeyboardNum
