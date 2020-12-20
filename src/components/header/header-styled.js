import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    //padding-bottom: 10px;
`;

export const HeaderContainerInner = styled.div`
    height: 50px;
    width: 100%;
    background-color: rgba(90,90,90,1.0);
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
  font-size: 30px;
  color: white;
`;

export const IconContainerBase = styled.div`
  position: relative;
  >div{
    position: absolute;
    width: 70px;
    height: 4px;
    top: 50px;
    left: -10px;
    border-radius: 4px;
  }
  svg{
    width: 50px;
    height: 50px;
    fill: none;
    stroke-linecap:round;
    stroke-miterlimit:10;
    stroke-width:4px;
  }
`;

export const IconHomeContainer = styled(IconContainerBase)`
  >div {
    background-color: ${props => props.on ? "rgba(35,255,1,1.0)" : 'transparent'};
  }
  svg{
    stroke: ${props => props.on ? "rgba(35,255,1,1.0)" : 'white'};
  }
`;

export const IconSettingsContainer = styled(IconContainerBase)`
  >div {
    background-color: ${props => props.on ? "rgba(255,245,3,1.0)" : 'transparent'};
  }
  svg{
      margin-top: 3px;
      stroke: ${props => props.on ? "rgba(255,245,3,1.0)" : 'white'};
  }
`;

export const IconAlarmContainer = styled(IconContainerBase)`
  >div {
    background-color: ${props => props.on ? "rgba(239,27,20,1.0)" : 'transparent'};
  }
  svg{
    margin-top: 7px;
    stroke: ${props => props.on ? "rgba(239,27,20,1.0)" : 'white'};
    path{
      stroke-width:1px;
    }
  }
`;
