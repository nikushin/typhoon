import React from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {showKeyboard} from "../../actions";
import styled from "styled-components";
import {HistoryRequest} from "../../actions/graph";
import {setKeyboardParameter} from '../../actions/index'

export const Container = styled.div`
  background-color: rgba(90,90,90,0.57);
  border-radius: 10px;
  height: 120px;
  width: 300px;
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

const VidgetInputOutput = ({test_value, keeper, parameter, min, max, top, left, title, color, inputMode = true}) =>  {
    const value = useSelector(state => state[keeper][parameter]);
    const dispatch = useDispatch();

    const showKeyboardOnClick = () => {
        if (inputMode) {dispatch(showKeyboard({startValue: value, min, max, top, left,
            func: (value) => {dispatch(setKeyboardParameter({value, keeper, parameter }))}
        }));}
    };

    return (
      <Container onClick={showKeyboardOnClick} color={color}>
        <div>
            {title}
        </div>

        <div>
            {/*{test_value}*/}
           {value?value:'н/д'}
        </div>
      </Container>
    )
};

export default VidgetInputOutput;
