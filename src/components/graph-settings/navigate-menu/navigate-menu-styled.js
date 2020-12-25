import styled from "styled-components";

export const SvgIcon = styled.svg`
  width: 60px;
  height: 60px;
  fill: white;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 250px 150px 300px;
  grid-template-areas:
  "navigate steps";
  > div:nth-child(1) {
    grid-area: navigate;
    display: grid;
    grid-template-columns: 80px 100px 80px;
    grid-template-rows: 80px 80px 80px;
    grid-template-areas:
    "  .    up    ."
    "left value right"
    "aline   down   .";
    > div {
    display: flex;
    justify-content: center;
    align-items: center;
    }
    > div:nth-child(1) {
    grid-area: value;
    flex-direction: column;
      > div:first-child {
      font-size: 45px;
      }
      > div:last-child {
      font-size: 25px;
      }
    }
    > div:nth-child(2) {
    grid-area: up;
    }
    > div:nth-child(3) {
    grid-area: right;
    }
    > div:nth-child(4) {
    grid-area: down;
    }
    > div:nth-child(5) {
    grid-area: left;
    }
    > div:nth-child(6) {
    grid-area: aline;
    font-size: 70px;
    //padding: 0 0 20px 20px;
    >div{
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    }
  }
  
   > div:nth-child(2) {
    grid-area: steps;
    >div {
    height: 50px;
    font-size: 40px;
    text-align: center;
    }
  }
`;

export const OneStepDiv = styled.div`
    background-color: ${props => props.on ? "#8cc6d0" : "transparent"};
`;

// export const OneStoryContainer = styled.div`
//   width: 200px;
//   height: 50px;
//   background-color: white;
//   margin: 10px;
// `;
//
// export const StoriesContainer = styled.div`
//   ${props => props.visible ? "" : "display:none"};
//
// `;
