import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
`;

export const HeaderContainerInner = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgb(90,90,90);
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div:last-child{
      display: flex;
      height: 100%;
      > div{
        display: flex;
        align-items: center;
        margin-right: 30px;
      }
       > div:last-child{
        margin-right: 40px;
      }
    }
`;

export const RecipeContainer = styled.div`
  margin-left: 30px;
  font-size: 45px;
  color: white;
`;

export const IconContainerBase = styled.div`
  position: relative;
  >div{
    position: absolute;
    width: 100px;
    height: 4px;
    top: 87px;
    left: -10px;
    border-radius: 4px;
  }
  svg{
    width: 80px;
    height: 80px;
    fill: none;
    stroke-linecap:round;
    stroke-miterlimit:10;
    stroke-width:4px;
  }
`;

export const IconHomeContainer = styled(IconContainerBase)`
  >div {
    background-color: ${props => props.on ? "rgb(35,255,1)" : 'transparent'};
  }
  svg{
    stroke: ${props => props.on ? "rgb(35,255,1)" : 'white'};
  }
`;

export const IconSettingsContainer = styled(IconContainerBase)`
  >div {
    background-color: ${props => props.on ? "rgb(255,245,3)" : 'transparent'};
  }
  svg{
      margin-top: 3px;
      stroke: ${props => props.on ? "rgb(255,245,3)" : 'white'};
  }
`;

export const IconAlarmContainer = styled(IconContainerBase)`
  >div {
    background-color: ${props => props.on ? "rgb(239,27,20)" : 'transparent'};
  }
  svg{
    margin-top: 7px;
    stroke: ${props => props.on ? "rgb(239,27,20)" : 'white'};
    path{
      stroke-width:1px;
    }
  }
`;
