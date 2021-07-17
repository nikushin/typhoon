import styled from "styled-components";

const width = 100;

export const Container = styled.div`
  font-size: 25px;
  display: grid;
  grid-template-columns: 1500px 100px 100px 220px;
  grid-template-rows: 240px;
  grid-template-areas:
  "pid device buttons steps";
  > div:nth-child(1) {
    grid-area: pid;
    display: grid;
    grid-template-columns: ${width}px ${width}px ${width}px ${width}px ${width}px ${width}px ${width}px ${width}px ${width}px ${width}px;
    //grid-template-rows: 100px 100px 100px;
    grid-template-areas:
    "p tsp t kt vsp v kv asp a ka";
    > div {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    align-items: center;
    background-color: #2ea58f;
    text-align: center;
    }
    > div:nth-child(1) {
    grid-area: p;
    }
    > div:nth-child(2) {
    grid-area: tsp;
    }
    > div:nth-child(3) {
    grid-area: t;
    }
    > div:nth-child(4) {
    grid-area: kt;
    }
    > div:nth-child(5) {
    grid-area: vsp;
    }
    > div:nth-child(6) {
    grid-area: v;
    }
    > div:nth-child(7) {
    grid-area: kv;
    }
    > div:nth-child(8) {
    grid-area: asp;
    }
    > div:nth-child(9) {
    grid-area: a;
    }
    > div:nth-child(10) {
    grid-area: ka;
    }
  }
   > div:nth-child(2) {
   padding-left: 10px;
    grid-area: device;
  }
  > div:nth-child(3) {
    grid-area: buttons;
  }
  > div:nth-child(4) {
    padding-left: 25px;
    grid-area: steps;
  }
 `;

export const Button = styled.div`
 width: 100px;
 height: 50px;
 background-color: rgb(90,90,90);
 margin-bottom: 10px;
`;