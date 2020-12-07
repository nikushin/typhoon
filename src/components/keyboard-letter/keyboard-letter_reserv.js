import React, {useContext, useEffect, useState} from 'react';
import {Container, ContainerInner, Button, SvgIcon} from './keyboard-letter-styled'
import {useDispatch, useSelector} from "react-redux";
import {setKeyboardLetterParameter} from "../../actions";

const KeyboardLetter = () => {

  const [Input, setInput] = useState('0');

  const [Switch, setSwitch] = useState('russian');
  const [Keys, setKeys] = useState([]);

  const keyboardOpen = useSelector(state => state.KeyboardDisplayKeeper.showKeyboardLetter);
  const dispatch = useDispatch();


  const BackspacePress = () => {
    setInput( (i) => i.slice(0, -1) );
  };

  const ExitPress = () => {
    setInput( (i) => i.slice(0, -1) );
  };

  const ShiftPress = () => {
    setInput( (i) => i.slice(0, -1) );
  };

  const EnterPress = () => {
    if (Input !== '') {
      dispatch(setKeyboardLetterParameter(Input));
    } else {
      dispatch(setKeyboardLetterParameter(0));
    }
    setInput('0');
  };

  const onKeyPress = (button) => {
        setInput((i) => i + button);
      };

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

  const SwitchPress = () => {
    setSwitch((s)=>{
      if (s==='russian') {return 'english'}
      if (s==='english') {return 'marks'}
      if (s==='marks') {return 'russian'}
    })
  };

  const buttons_service = <div>
    <Button top={80} left={900} onClick={BackspacePress}>
      <SvgIcon src={'/img/keyboard/backspace.svg'}/>
    </Button>

    <Button top={300} left={900} onClick={SwitchPress}>

      <SvgIcon src={'/img/keyboard/switch.svg'}/>
    </Button>

    <Button top={400} left={800} onClick={EnterPress}>
      <SvgIcon src={'/img/keyboard/enter.svg'}/>
    </Button>

    <Button top={400} left={150} onClick={ExitPress}>
      <SvgIcon src={'/img/keyboard/exit.svg'}/>
    </Button>

    <Button top={300} left={50} onClick={ShiftPress}>
      <SvgIcon src={'/img/keyboard/shift.svg'}/>
    </Button>
  </div>;

  useEffect(() => {
    console.log(Switch);
    setKeys(keyboardOptions.layout[Switch].map((button_row, i_button_row) =>
    <div>
      {button_row.map((button, i_button) =>
        <Button top={i_button_row*55+55} left={i_button*55} onClick={() => onKeyPress(button)}>
          {button}
        </Button>
      )}
    </div>
    )
  );
  },[Switch]);


  return (
    <Container visible={keyboardOpen}>
      <ContainerInner>
        <div data-placeholder="Enter">
          {Input}
        </div>
        {Keys}
        {buttons_service}
      </ContainerInner>
    </Container>
  );
};

export default KeyboardLetter
