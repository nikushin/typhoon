import React, {useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {showKeyboard} from "../../actions";
import styled from "styled-components";
import {setKeyboardParameter} from '../../actions/index'

const Container = styled.div`
  background-color: rgb(99,99,99);
  border-radius: 10px;
  height: ${props => props.height}px;
  width: 250px;
  font-size: 40px;
  display: flex;
  padding: 5px 15px 15px 15px;
  flex-direction: column;
  justify-content: space-between;
  color: ${props => props.color};
  > div:first-child {
      //margin-left: 5px;
  }
  > div:last-child {
      text-align: right;
      //margin-right: 5px;
      font-family: "TT Norms Medium", serif;
  }
`;

const VidgetInputOutput = ({height = 120, keeper, parameter, min, max,
                               top, left, title, color, type='simple' ,inputMode = true}) =>  {
    const value = useSelector(state => state[keeper][parameter]);
    const [VisibleValue, setVisibleValue] = useState(undefined);

    useLayoutEffect(() => {
        if (type ==='simple') {setVisibleValue(value)}
        if (type === 'time') {
            const minutes = Math.floor(value/60);
            const seconds = value - minutes*60;
            setVisibleValue(minutes.toString() + ":" + ((String(seconds).length) > 1 ? '' : '0' ) + seconds.toString());
        }

    },[value]);

    const dispatch = useDispatch();
    const showKeyboardOnClick = () => {
        if (inputMode) {dispatch(showKeyboard({startValue: value, min, max, top, left, type,
            func: (value) => {dispatch(setKeyboardParameter({value, keeper, parameter }))}
        }));}
    };

    return (
      <Container onClick={showKeyboardOnClick} color={color} height={height}>
        <div>
            {title}
        </div>

        <div>
           {VisibleValue !== undefined ? VisibleValue :'н/д'}
        </div>
      </Container>
    )
};

export default VidgetInputOutput;
