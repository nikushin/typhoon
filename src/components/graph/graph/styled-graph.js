import styled, {css, keyframes} from "styled-components";

const css_real_time_lines_animate_up_keyframes = (t) => keyframes`
   0%{transform: scale(1, ${t});}
   100%{transform: scale(1, 1);}
  `;

const css_real_time_lines_animate_up = (t) => css`animation:
   ${css_real_time_lines_animate_up_keyframes(t)}
   ${1-t}s
   ease-out`;

const css_real_time_lines_animate_down_keyframes = (t) => keyframes`
   0%{transform: scale(1, ${t});}
   100%{transform: scale(1, 0);}
  `;

const css_real_time_lines_animate_down = (t) => css`animation:
   ${css_real_time_lines_animate_down_keyframes(t)}
   ${t}s 
   ease-out`;

export const SVGrealTimeLineG = styled.g`
   ${props => props.Visible ? (props => css_real_time_lines_animate_up(props.Transform)) :
   (props => css_real_time_lines_animate_down(props.Transform))};
   transform-box: fill-box;
   transform-origin: bottom;
   animation-fill-mode: forwards;
   stroke-width: 1.5px;
   stroke-linecap: round;
`;

//с контейнером почему-то лаги при mount
export const SVGrealTimeLinesContainer = styled.g`
   stroke-width: 1.5px;
   stroke-linecap: round;
`;

export const SVGgraph = styled.svg`
    position: absolute;
    left: ${props => props.borderLeft}px;
    top: ${props => props.borderTop}px;
    outline: 1px solid white;
`;

export const SVGadditional = styled.svg`
    left: 0px;
    top: 0px;
    pointer-events: none;
    position: absolute;
`;

export const SVGbackground = styled.svg`
    stroke-width: 1px;
    stroke: white;
    pointer-events: none;
    background-color: rgb(70, 70, 70);
    left: ${props => props.borderLeft}px;
    top: ${props => props.borderTop}px;
    position: absolute;
`;

export const SVGaxes = styled.line`
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

export const SVGtextRor = styled(SVGtextBase)`
   text-anchor : start;
`;


export const SVGcontainer = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: relative;
  //z-index: -1;
`;

export const SVGLegendsContainer = styled.div`
    display: flex;
    Justify-content: center;
`;

export const SVGLegendsButton = styled.div`
      display: flex;
      Justify-content: center;
      align-items: center;
      width: 80px;
      height: 30px;
      background-color: ${props => props.On ? props.Color : "gray"};
      margin: 5px;
`;

export const SaveRuqest = styled.div`
  ${props => props.visible ? "" : "display:none"};
  width: 300px;
  height: 120px;
  position: absolute;
  z-index: 1;
  left: 450px;
  top: 25px;
  color: white;
  background-color: #ff913e;
  opacity: 0.7;
  font-size: 30px;
  > div:first-child{
    text-align: center;
  }
  > div:last-child{
    text-align: center;
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    >div{
    width: 100px;
    height: 45px;
    background-color: #ff661e;
    display: flex;
    justify-content: center;
    align-items: center;
    }
  }
`;
