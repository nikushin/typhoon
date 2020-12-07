import React, {useEffect, useState, useRef, Fragment, useLayoutEffect} from 'react';
import {Container, ContainerInner, Button, SvgIcon, Display} from './keyboard-letter-styled'
import {useDispatch, useSelector} from "react-redux";
import {setKeyboardLetterParameter} from "../../actions";

const keyboardOptions = {
  layout: {
    russian: [
      ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х'],
      ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
      ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'],
    ],
    english: [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    ],
    marks: [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['.', ',', ';', ':', '/', '_', '-', '!', '?', '(', ')'],
      ['#', '@', '*', '"', '№', '<', '>', '%', '$'],
    ],
  },
};

const KeyboardLetter = () => {
  const dispatch = useDispatch();
  const inputEl = useRef(null);
  const [Input, setInput] = useState('0');
  const [CaretPos, setCaretPos] = useState(undefined);

  const [Switch, setSwitch] = useState('russian');
  const [Keys, setKeys] = useState([]);
  const [Shift, setShift] = useState(false);

 const {value} = useSelector(state => state.KeyboardDisplayKeeper.letter);

  useLayoutEffect(() => {
    inputEl.current.focus();
    setInput(value)
  },[]);

  useLayoutEffect(() => {
    if (CaretPos) {
      inputEl.current.setSelectionRange(CaretPos, CaretPos)
    }
  },[CaretPos]);

  const BackspacePress = () => {
    setInput((i) =>{
      const array = i.split('');
      array.splice(inputEl.current.selectionStart-1, 1);
      return array.join('')
    });
    setCaretPos(inputEl.current.selectionStart-1);
  };

  const ExitPress = () => {
    dispatch(setKeyboardLetterParameter(value));
  };

  const ShiftPress = () => {
    setShift(s => !s)
  };

  const EnterPress = () => {
    if (Input !== '') {
      dispatch(setKeyboardLetterParameter(Input));
    }
  };

  const SpacePress = (e) => {
    setCaretPos(inputEl.current.selectionStart+1);
    setInput((i) =>{
        const array = i.split('');
        array.splice(inputEl.current.selectionStart, 0, ' ');
        return array.join('')
    });
  };

  const onKeyPress = (button) => {
        setCaretPos(inputEl.current.selectionStart+1);
    setInput((i) =>{
      const array = i.split('');
      array.splice(inputEl.current.selectionStart, 0, button);
      return array.join('')
    });
  };

  const SwitchPress = () => {
    setSwitch((s)=>{
      if (s==='russian') {return 'english'}
      if (s==='english') {return 'marks'}
      if (s==='marks') {return 'russian'}
    })
  };

  const onBlur = () => {
    inputEl.current.focus();
  };

  const buttons_shift =
    <Button top={250} left={15} onClick={ShiftPress}>
      {Shift ? <SvgIcon src={'/img/keyboard/shift_on.svg'}/> : <SvgIcon src={'/img/keyboard/shift_off.svg'}/>  }
    </Button>;

  const buttons_service = <Fragment>
    <Button top={80} left={915} onMouseDown={BackspacePress}>
      <SvgIcon src={'/img/keyboard/backspace.svg'}/>
    </Button>

    <Button top={250} left={915} onMouseDown={SwitchPress}>

      <SvgIcon src={'/img/keyboard/switch.svg'}/>
    </Button>

    <Button top={335} left={810} onMouseDown={EnterPress}>
      <SvgIcon src={'/img/keyboard/enter.svg'}/>
    </Button>

    <Button top={335} left={80} onMouseDown={ExitPress}>
      <SvgIcon src={'/img/keyboard/exit.svg'}/>
    </Button>

    <Button top={335} left={240} width={500} onMouseDown={SpacePress}>

    </Button>
  </Fragment>;

  useLayoutEffect(() => {
    setKeys(keyboardOptions.layout[Switch].map((button_row, i_button_row) =>
    <Fragment>
      {button_row.map((button, i_button) => {
        const button_rend = Shift ? button.toUpperCase() : button;

        const top_indent = i_button_row*85+80;
        let left_indent = undefined;
          if (Switch === 'russian') {
          if (i_button_row === 0) {
            left_indent = i_button*80+15;
          } else if (i_button_row === 1) {
            left_indent = i_button*80+55;
          } else if (i_button_row === 2) {
            left_indent = i_button*80+135;
          }
        } else if (Switch === 'english') {
          if (i_button_row === 0) {
            left_indent = i_button*85+40;
          } else if (i_button_row === 1) {
            left_indent = i_button*85+80;
          } else if (i_button_row === 2) {
            left_indent = i_button*85+165;
          }
        } else if (Switch === 'marks') {
          if (i_button_row === 0) {
            left_indent = i_button*80+70;
          } else if (i_button_row === 1) {
            left_indent = i_button*80+30;
          } else if (i_button_row === 2) {
            left_indent = i_button*80+110;
          }
        }

        return <Button top={top_indent} left={left_indent}
                       onClick={() => onKeyPress(button_rend)}>
                {button_rend}
              </Button>
        }
      )}
    </Fragment>
    )
  );
  },[Switch, Shift]);


  return (
    <Container onBlur={onBlur}>
      <ContainerInner>
        <Display ref={inputEl} value={Input} placeholder={"Введите что-нибудь!"}/>
        {Keys}
        {buttons_service}
        {Switch !== 'marks' ? buttons_shift : ''}
      </ContainerInner>
    </Container>
  );
};

export default KeyboardLetter
