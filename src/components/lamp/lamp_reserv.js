import {useSelector} from "react-redux";
import React, {Fragment} from "react";
import styled, { css } from 'styled-components'
import './lamp.css'

const Lamp = ({parameter, keeper, blink}) => {
  const on = useSelector(state => state[keeper][parameter]);
  const {color} = useSelector(state => state.valueKeeper.globalColor);

  const lampStyle = () => {
  if (on) {
    return (
      {backgroundColor: `rgb(${color})`,
        boxShadow: `rgb(${color}) 0 0 8px 2px, rgba(0, 0, 0, 0.9) 1px 1px 0 0, rgba(255, 255, 255, 0.1) -1px -1px 0 0`}
    )} else {
    return ({
      backgroundColor: 'rgb(110, 110, 110)',
      boxShadow: 'rgba(0, 0, 0, 0.5) 0 0 8px -1px inset, rgba(0, 0, 0, 0.6) 0 0 4px 0 inset, rgba(0, 0, 0, 0.9) -1px -1px 0 0, rgba(255, 255, 255, 0.1) 1px 1px 0 0'
    })}};

  // const LampInnerStyle = styled.div`
  //   margin: 15px;
  //   width: 15px;
  //   height: 15px;
  //   border-radius: 50%;
  //   background-color: rgb(110, 110, 110);
  //   box-shadow: rgba(0, 0, 0, 0.5) 0 0 8px -1px inset, rgba(0, 0, 0, 0.6) 0 0 4px 0 inset, rgba(0, 0, 0, 0.9) -1px -1px 0 0, rgba(255, 255, 255, 0.1) 1px 1px 0 0;
  //   background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%);
  //   background-blend-mode: overlay;
  //   transition: all 2000ms ease-in-out 0s;
  //   ${props => props.isSelected && css`
  //   transition: all 2000ms ease-in-out 0s;
  //     background-color: rgb(${color});
  //     box-shadow: rgb(${color}) 0 0 8px 2px, rgba(0, 0, 0, 0.9) 1px 1px 0 0, rgba(255, 255, 255, 0.1) -1px -1px 0 0;
  //   `}
  //   `;
  return(
  /*<LampInner> </LampInner>*/
  <div className={`${on ? ("lamp-on ") : ("lamp-off ")} ${blink ? "lamp-blink" : ""}`}

   style={lampStyle()}/>
)
};


export default Lamp

