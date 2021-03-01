import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-rows: 50px 50px 100px;
  grid-template-areas:
  "total-count"
  "select-menu"
  "navigate"
  "content";

  > div:nth-child(1) {
    grid-area: total-count;
    //background-color: #d05c60;
    justify-self: end;
    font-size: 25px;
    padding-right: 20px;
  }
  > div:nth-child(2) {
      grid-area: select-menu;
      display: flex;
      justify-content: space-around;
    >div {
       display: flex;
       align-items: center;
       justify-content: center;
       width: 250px;
       height: 50px;
    }    
    >div:nth-child(1) {
        background-color: ${props => props.history_delete_mode ? '#d05c60' : '#5a5a5a'};
    }
    >div:nth-child(2) {
        background-color: ${props => props.bg ? '#3973d0' : '#5a5a5a'};
    } 
  }
   > div:nth-child(3) {
    grid-area: navigate;
    //background-color: #8cc6d0;
    display: flex;
    justify-content: center;
    font-size: 45px;
    >div{
      display: flex;
      align-items: center;
      justify-content: center;
      //background-color: #5c7275;
      margin-left: 20px;
      margin-right: 20px;
      padding: 0 20px 0 20px;
    }
    >div:nth-child(1), >div:nth-child(3) {
      font-size: 70px;
      padding-bottom: 13px;
    } 
     >div:nth-child(2) {
      min-width: 180px;
    } 
  }
   > div:nth-child(4) {
    grid-area: content;
    //background-color: #5ed036;
    //display: flex;
    //flex-wrap: wrap-reverse;
    //justify-content: space-around;
    //flex-direction: row-reverse;
    //align-content: end;
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    font-size: 30px;
    
  }
`;

const OneStoryContainerGetBackground = ({history_delete_mode, chosen, bg}) => {
  if (bg) {return '#3973d0'}
  if (chosen) {return '#d0bc49'}
  if (history_delete_mode) {return '#d05c60'}

  return '#5a5a5a'
};


export const OneStoryContainer = styled.div`
  width: 300px;
  height: 100px;
  background-color: ${props => OneStoryContainerGetBackground(props)};
  //background-color: ${props => props.history_delete_mode ? '#d05c60' : '#5a5a5a'};
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 5px 0 5px;
  > div:first-child {
   display: flex;
   justify-content: space-between;
  }
   > div:last-child {
    display: flex;
   justify-content: space-between;
  }
`;

export const StoriesContainer = styled.div`
  ${props => props.visible ? "" : "display:none"};
`;
