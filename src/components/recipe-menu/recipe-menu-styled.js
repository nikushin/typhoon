import styled from "styled-components";

export const Container = styled.div`
    width: 420px;
    display: flex;
    flex-direction: column;
    font-size: 40px;
    justify-content: center;
    align-items: center;
    > div:nth-child(1) { //название рецепта
        width: 100%;
        margin: 30px 20px 20px 10px;
        padding: 15px 15px 15px 15px;
        background-color: rgba(90,90,90,0.57);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    > div:nth-child(2) { //меню
        width: 100%;
        display: flex;
        height: 50px;
        font-family: "TT Norms Medium", serif;
        justify-content: space-between;
        > div{
          display: flex;
        }
        > div:nth-child(1), > div:nth-child(2) { //все вложенные минимальные элементы
            >div {
                width: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        > div:nth-child(1) { //лево право
            > div:nth-child(2), > div:nth-child(3) { //цифры 
              background-color: rgba(90,90,90,0.57);
            }
            > div:nth-child(2) { //отступ между цифрами
              margin-right: 10px;
            }
        }
        
        > div:nth-child(2) { //добавить удалить
            >div{
              margin-right: 10px;
            } 
        }       
    } 
`;

export const SvgIcon = styled.svg`
    width: 50px;
    height: 50px;
    fill: transparent;
    stroke-width: 7px;
    stroke: white;
    stroke-linecap:round;
    stroke-linejoin:round;
    pointer-events: none;
`;