import {useSelector} from "react-redux";
import { createSelector } from "reselect";
import React, {Fragment, useEffect} from "react";
import styled, { css, keyframes } from 'styled-components'
import './lamp.css'

let colorGlobal = "";

const keyframesBlink = keyframes`
0% {     background-color: rgb(110, 110, 110);
    box-shadow: rgba(0, 0, 0, 0.5) 0 0 8px -1px inset, rgba(0, 0, 0, 0.6) 0 0 4px 0 inset, rgba(0, 0, 0, 0.9) -1px -1px 0 0, rgba(255, 255, 255, 0.1) 1px 1px 0 0; }
100% { background-color: rgb(${colorGlobal});
      box-shadow: rgb(${colorGlobal}) 0 0 8px 2px, rgba(0, 0, 0, 0.9) 1px 1px 0 0, rgba(255, 255, 255, 0.1) -1px -1px 0 0; } 
`;

const LampInner = styled.div`
    margin: 15px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: rgb(110, 110, 110);
    box-shadow: rgba(0, 0, 0, 0.5) 0 0 8px -1px inset, rgba(0, 0, 0, 0.6) 0 0 4px 0 inset, rgba(0, 0, 0, 0.9) -1px -1px 0 0, rgba(255, 255, 255, 0.1) 1px 1px 0 0;
    background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%);
    background-blend-mode: overlay;
    transition: all 100ms ease-in-out 0s;
    ${props => props.switch && css`
      background-color: rgb(${colorGlobal});
      box-shadow: rgb(${colorGlobal}) 0 0 8px 2px, rgba(0, 0, 0, 0.9) 1px 1px 0 0, rgba(255, 255, 255, 0.1) -1px -1px 0 0;
    `}
    ${props => props.blink && css`
    animation: ${keyframesBlink} 500ms ease-out infinite; 
    transition: all 0ms ease-in-out 0s;
    `}
    `;

// const selectOn = state => state[keeper][parameter];
const selectOn = state => state[keeper][parameter];
const SelectorOn = createSelector(selectOn, (parameter) => {
  return parameter
});

const Lamp = ({parameter, keeper, blink}) => {

  const on = useSelector(SelectorOn);
  const {color} = useSelector(state => state.valueKeeper.globalColor);
  const blinkOut = useSelector(state => state[keeper][blink]);

  console.log('rend');

  colorGlobal = color;
  return(
  <LampInner switch={on} blink={blinkOut}> </LampInner>
)
};


export default Lamp

