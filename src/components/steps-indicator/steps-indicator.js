import React, {Fragment} from "react";
import styled from "styled-components";

export const StepsContainer = styled.div`
  >div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    height: 65px;
    background-color: rgba(90,90,90,0.57);
    margin-bottom: 10px;
    font-size: 30px;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const StepsIndicator = () => {
  return (
    <StepsContainer>
      <div>
        Ожидание
      </div>
      <div>
        <div>Подготовка</div><div>180°C</div>
      </div>
      <div>
        Загрузка
      </div>
      <div>
        <div>Жарка</div><div>00:00</div>
      </div>
      <div>
        <div>Охлаждение</div><div>00:00</div>
      </div>
      <div>
        Выгрузка
      </div>
    </StepsContainer>
  )
};

export default StepsIndicator;
