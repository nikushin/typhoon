import styled from "styled-components";


export const SVGgraphPower = styled.svg`
    position: absolute;
    left: ${props => props.borderLeft}px;
    top: ${props => props.borderTop}px;
    //z-index: -1;
    outline: 1px solid white;
`;

export const SVGadditionalPower = styled.svg`
    //background-color: gray;
    position: absolute;
    left: 0px;
    top: 0px;
    pointer-events: none;
    //z-index: -1;
`;

export const SVGbackgroundPower = styled.svg`
    stroke-width: 1px;
    stroke: white;
    pointer-events: none;
    background-color: rgb(70, 70, 70);
    position: absolute;
    left: ${props => props.borderLeft}px;
    top: ${props => props.borderTop}px;
    //z-index: -1;
`;

export const SVGcontainerPower = styled.div`
  margin-top: 10px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: relative;
  //z-index: -1;
`;

export const SVGaxesPower = styled.line`
   stroke: white;
   stroke-dasharray: 0;
   stroke-width: 0.1;
`;

const SVGtextBase = styled.text`
   //font-size: 12px;
`;

export const SVGtextTemp = styled(SVGtextBase)`
   text-anchor : end;
`;

export const SVGtextTime = styled(SVGtextBase)`
   text-anchor : middle;
`;
