import styled from "styled-components";

export const HomePageContainer = styled.div`
  display: grid;
  grid-template-columns: 1250px;
  grid-template-rows: 120px;
  grid-template-areas:
  "graph menu"
  "graph main";
  > div:nth-child(1) {
    grid-area: graph;
  }
   > div:nth-child(2) { //иконка истории и ручн/авто 
    grid-area: menu;
    display: flex;
    justify-content: flex-end;
   padding-top: 20px;
  }
   > div:nth-child(3) {
    grid-area: main;
  }
 `;

export const RealTimeContainer = styled.div`
margin-top: 40px;
  display: grid;
  grid-template-rows: 250px auto;
  grid-template-columns: 45% auto;
  grid-template-areas:
  "sliders sliders"
  "parameters steps";
  > div:nth-child(1) {
    grid-area: sliders;
  }
   > div:nth-child(2) { //иконка истории и ручн/авто 
    grid-area: parameters;
    justify-self: center;
  }
   > div:nth-child(3) {
    grid-area: steps;
    padding-left: 20px;
  }
 `;

export const StepsContainer = styled.div`
`;

export const VidgetContainer = styled.div`
  > div {
    margin-bottom: 40px;
  }
   > div:last-child {
    margin-bottom: 0px;
  }
`;

export const SliderContainer = styled.div`
  padding-left: 70px;
  > div:first-child {
   margin-bottom: 20px;  
  }
`;

export const RoastModeContainer = styled.div`
  width: 300px;
  height: 80px;
  margin: 10px 20px 10px 10px;
  background-color: rgba(70, 70, 70, 0.9);
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HistoryIconContainer = styled.div`
  background-color: rgba(70, 70, 70, 0.9);
  width: 200px;
  height: 80px;
  margin: 10px 0px 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SvgIconHistory = styled.svg`
  width: 80px;
  height: 80px;
  fill: ${props => props.on ? "rgba(255,206,0,1.0)" : 'white'};
`;

export const SvgIconFan = styled.svg`
  width: 80px;
  height: 80px;
  fill: white;
  pointer-events: none;
`;
