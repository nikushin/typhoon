import React, {useContext, useEffect, useState, useRef, Fragment, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {showKeyboardLetter} from "../../actions";
import {Button} from "../keyboard-letter/keyboard-letter-styled";

const InputSmart = ({name, keeper}) => {
  const [Caret, SetCaret] = useState(0);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const value = useSelector(state => state[keeper][name]);

  const onClick = () => {
    dispatch(showKeyboardLetter(name,keeper));
  };

  // const test = () => {
  //   dispatch(showKeyboardLetter(name,keeper));
  //   setTimeout(() => {inputRef.current.setSelectionRange(0, 0)}, 0)
  // };
  //
  return (
    <div onClick={onClick}>
      {value}
    </div>
  );
};

export default InputSmart;
