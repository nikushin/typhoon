import styled from "styled-components";

export const SVGcursor = styled.line`
    stroke-width: 2px;
    stroke: green;
`;
export const SVGgraph = styled.svg`
    position: absolute;
    left: ${props => props.borderLeft}px;
    top: ${props => props.borderTop}px;
    border: 1px solid white;
`;

export const SVGadditional = styled.svg`
    //background-color: gray;
    position: absolute;
    left: 0px;
    top: 0px;
    pointer-events: none;
`;

export const SVGbackground = styled.svg`
    stroke-width: 1px;
    stroke: white;
    pointer-events: none;
    background-color: rgb(70, 70, 70);
    position: absolute;
    left: ${props => props.borderLeft}px;
    top: ${props => props.borderTop}px;
    border: 1px solid transparent;
`;

export const SVGcontainer = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: relative;
`;

export const SVGaxes = styled.line`
   stroke: white;
   stroke-dasharray: 0;
   stroke-width: 0.1;
`;

export const SVGtextTemp = styled.text`
   text-anchor : end;
`;

export const SVGtextTime = styled.text`
   text-anchor : middle;
`;
