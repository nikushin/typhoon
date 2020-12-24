import {useDispatch, useSelector} from "react-redux";
import React, {memo, useEffect, useLayoutEffect, useState} from "react";
import {Container, SvgIcon, OneStepDiv} from './navigate-menu-styled'
import {SettingsCursorGoUp, SettingsCursorGoDown, SettingsCursorGoLeft,
  SettingsCursorGoRight, SettingsCursorAline, SettingsCursorManual, ChangeStep} from "../../../actions/settings-graph-actions";
import {setKeyboardParameter, showKeyboard} from "../../../actions";

export const Icon = (vektor, func) => {
  let path = null;
  if (vektor === 'up') {path = <path d="M18.77,7.44h2.49L34.58,32.56H30.25L20,13,9.78,32.56H5.42Z"/>}
  if (vektor === 'down') {path = <path d="M21.23,32.56H18.74L5.42,7.44H9.75L20,27,30.22,7.44h4.36Z"/>}
  if (vektor === 'left') {path = <path d="M7.44,21.23V18.74L32.56,5.42V9.75L13,20,32.56,30.22v4.36Z"/>}
  if (vektor === 'right') {path = <path d="M32.56,18.77v2.49L7.44,34.58V30.25L27,20,7.44,9.78V5.42Z"/>}
  return (
    <SvgIcon onClick={() => func()} viewBox="-5 -5 50 50">
      {path}
    </SvgIcon>
  )
};

const OneStep = (value) => {
  const dispatch = useDispatch();
  const cur_step = useSelector(state => state.graphSettingsKeeper.step);
  return(<OneStepDiv on={cur_step===value} onClick={() => dispatch(ChangeStep(value))}>{value}</OneStepDiv>)
};

const NavigateMenu = () => {
  const dispatch = useDispatch();
  const [TimeXposition, setTimeXposition ] = useState('');
  const cursor_y = useSelector(state => state.graphSettingsKeeper.cursor_y);
  const cursor_x = useSelector(state => state.graphSettingsKeeper.cursor_x);
  const step = useSelector(state => state.graphSettingsKeeper.step);
  const steps = useSelector(state => state.graphSettingsKeeper.steps);

  const allSteps = steps.map((item) => OneStep(item));

  useLayoutEffect(() => {
    const minutes = Math.floor(Math.abs(cursor_x/60));
    const seconds = Math.abs(cursor_x) - minutes*60;
    setTimeXposition(`${minutes}:${((String(seconds).length) > 1 ? '' : '0' )}${seconds}`)
  },[cursor_x]);

  return(
    <Container step={step}>
      <div>
        <div>
          <div onClick={() => dispatch(showKeyboard({startValue: cursor_y, min: 0, max: 100, top: 250, left:250,
            func: (value) => {dispatch(SettingsCursorManual(value))}
          }))}>
            {cursor_y}
          </div>
          <div>{TimeXposition}</div>
        </div>
        <div>{Icon('up', () => dispatch(SettingsCursorGoUp()))}</div>
        <div>{Icon('right', () => dispatch(SettingsCursorGoRight()))}</div>
        <div>{Icon('down', () => dispatch(SettingsCursorGoDown()))}</div>
        <div>{Icon('left', () => dispatch(SettingsCursorGoLeft()))}</div>
        <div><div onClick={() => dispatch(SettingsCursorAline())}>=</div></div>
      </div>
      <div>
        <div>шаг</div>
        {allSteps}
      </div>
    </Container>

  )};

export default memo(NavigateMenu);
