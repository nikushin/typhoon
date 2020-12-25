import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-rows: 50px 80px;
  grid-template-areas:
  "total-count"
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
      font-size: 50px;
      padding-bottom: 13px;
    } 
     >div:nth-child(2) {
      min-width: 100px;
    } 
  }
   > div:nth-child(3) {
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
    font-size: 15px;
    //margin: 10px;
  }
`;

export const OneStoryContainer = styled.div`
  width: 170px;
  height: 60px;
  background-color: #5a5a5a;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 5px 0 5px;
  margin-bottom: 20px;
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
