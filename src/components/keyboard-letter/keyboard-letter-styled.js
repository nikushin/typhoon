import styled from "styled-components";

const WidthContainer = 1000;
const HeightContainer = 420;

export const Display = styled.input`
  position: absolute;
  top: 10px;
  left: 40px;
  font-size: 50px;
  color: white;
  border-style: none;
  outline: none;
  background: none;
`;

export const Container = styled.div`
  width: ${WidthContainer}px;
  height: ${HeightContainer}px;
  position: absolute;
  margin: auto;
  top: 0; left: 0; bottom: 0; right: 0;
  z-index: 100;
  background-color: rgba(35, 35, 35, 0.95);
  font-size: 30px;
  color: white;
  box-shadow: 4px 4px 12px 0px #141414;
`;

export const ContainerInner = styled.div`
  width: ${WidthContainer}px;
  height: ${HeightContainer}px;
  position: relative;
  > div:first-child {
    padding-left: 30px;
    padding-top: 10px;
    height: 50px;
    font-size: 40px;
    :empty:before{
      content:attr(data-placeholder);
      color:gray;
    }
  }
`;

export const Button = styled.button`
  width: ${props => props.width ? props.width : 70}px;
  height: 70px;
  border: none; outline: none; 
  border-radius: 7px;
  position: absolute;
  margin: auto;
  top: ${props =>props.top}px; left: ${props =>props.left}px;
  z-index: 100;
  background-color: rgba(51, 51, 51, 0.9);
`;
export const SvgIcon = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  margin: auto;
  top: 0; left: 0; bottom: 0; right: 0;
  pointer-events: none;
`;
