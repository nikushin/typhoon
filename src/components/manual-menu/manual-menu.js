import React from "react";
import styled from "styled-components";

const Container = styled.div`
margin-top: 25px;
padding-top: 20px;
width: 420px;
height: 410px;
font-size: 30px;
background-color: rgba(61,61,61,0.57);
    > div:first-child{
    margin-bottom: 15px;
        display: flex;
        justify-content: center;
        background-color: #2ea58f;
        margin: 10px 30px 10px 30px;
        padding: 10px 15px 10px 15px;
    }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  >div {
  margin: 10px 30px 10px 30px;
  padding: 10px 15px 10px 15px;
  background-color: rgba(90,90,90,0.57);
  }
  >div:nth-child(1), >div:nth-child(2) {
    display: flex;
    justify-content: space-between;
  }
`;


const ManualMenu = () => {
    return (
        <Container>
            <div>Ручной режим</div>
            <List>
                <div>
                    <div>ВВД</div><div>100</div>
                </div>
                <div>
                    <div>Нагрев</div><div>100</div>
                </div>
                <div>Мешалка</div>
                <div>Охладитель</div>
            </List>
        </Container>
    )
};

export default ManualMenu