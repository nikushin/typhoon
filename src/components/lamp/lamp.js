import { useSelector } from "react-redux";
import React, { memo } from "react";
import styled, { css, keyframes } from 'styled-components'

const size = '25';

const keyframesBlink = keyframes`
0% { background-color: rgb(110, 110, 110);
    box-shadow: rgba(0, 0, 0, 0.5) 0 0 8px -1px inset, rgba(0, 0, 0, 0.6) 0 0 4px 0 inset, rgba(0, 0, 0, 0.9) -1px -1px 0 0, rgba(255, 255, 255, 0.1) 1px 1px 0 0; }
100% { background-color: rgb(${props => props.color});
      box-shadow: rgb(${props => props.color}) 0 0 8px 2px, rgba(0, 0, 0, 0.9) 1px 1px 0 0, rgba(255, 255, 255, 0.1) -1px -1px 0 0; } 
`;

const LampStyle = styled.div`
    margin: 15px;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background-color: rgb(110, 110, 110);
    box-shadow: rgba(0, 0, 0, 0.5) 0 0 8px -1px inset, rgba(0, 0, 0, 0.6) 0 0 4px 0 inset, rgba(0, 0, 0, 0.9) -1px -1px 0 0, rgba(255, 255, 255, 0.1) 1px 1px 0 0;
    background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%);
    background-blend-mode: overlay;
    transition: all 100ms ease-in-out 0s;
    ${props => props.switch && css`
      background-color: rgb(${props => props.color});
      box-shadow: rgb(${props => props.color}) 0 0 8px 2px, rgba(0, 0, 0, 0.9) 1px 1px 0 0, rgba(255, 255, 255, 0.1) -1px -1px 0 0;
    `}
    ${props => props.blink && css`
    animation: ${keyframesBlink} 500ms ease-out infinite; 
    transition: all 0ms ease-in-out 0s;
    `}
    `;

const Lamp = ({parameters}) => {
  const {parameter, keeper, blink} = parameters;

  const on = useSelector(state => state[keeper][parameter]);
  const {color} = useSelector(state => state.mainKeeper.globalColor);
  const blinkOut = useSelector(state => state[keeper][blink]);

  // console.log('rend');

  return(
  <LampStyle switch={on} blink={blinkOut} color={color} > </LampStyle>
)};

export default memo(Lamp);

