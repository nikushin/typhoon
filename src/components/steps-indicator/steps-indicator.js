import React, {Fragment, useLayoutEffect, useEffect, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setKeyboardParameter, showKeyboard} from "../../actions";

export const StepsContainer = styled.div`
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    height: 65px;
    //background-color: rgba(90,90,90,0.57);
    margin-bottom: 10px;
    font-size: 30px;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const OneStepContainer = styled.div`
  background-color: ${props => props.on ? "#4dc4d0" : "rgb(90,90,90)"};
  > div {
      > div {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: right;
        align-items: center;
      }
  }
`;

const OneStep = ({name, parameter}) => {
    const on = useSelector(state => state.PhasesKeeper[parameter]);
    return(
        <OneStepContainer on={on}>
            {name}
        </OneStepContainer>
    )
};

const OneStepPrepare = () => {
    const on = useSelector(state => state.PhasesKeeper.prepare);
    const temp_prepare_sp = useSelector(state => state.analogParametersKeeper.temp_prepare_sp);
    const dispatch = useDispatch();

    const showKeyboardOnClick = () =>
        {
            dispatch(showKeyboard({startValue: temp_prepare_sp, min: 0, max: 250, top:500, left:1400,
            func: (value) => {
                dispatch(setKeyboardParameter({value:value, keeper:'analogParametersKeeper', parameter:'temp_prepare_sp' }))}
            }));
        };

    return(
        <OneStepContainer on={on}>
            <div>Подготовка</div><div onClick={showKeyboardOnClick}>{temp_prepare_sp}°C</div>
        </OneStepContainer>
    )
};

const OneStepCooling = () => {
    const on = useSelector(state => state.PhasesKeeper.cooling);
    const rest_of_cooling_time = useSelector(state => state.analogParametersKeeper.rest_of_cooling_time);
    const [VisibleValue, setVisibleValue] = useState(undefined);

    useEffect(() => {
            const minutes = Math.floor(rest_of_cooling_time/60);
            const seconds = rest_of_cooling_time - minutes*60;
            setVisibleValue(minutes.toString() + ":" + ((String(seconds).length) > 1 ? '' : '0' ) + seconds.toString());
    },[rest_of_cooling_time]);

    return(
        <OneStepContainer on={on}>
            <div>Охлаждение</div><div>{VisibleValue}</div>
        </OneStepContainer>
    )
};

const OneStepRoast = () => {
    const on = useSelector(state => state.PhasesKeeper.roast);
    const rest_of_cooling_time = useSelector(state => state.graphKeeper.roast_second);
    const [VisibleValue, setVisibleValue] = useState(undefined);

    useEffect(() => {
        const minutes = Math.floor(rest_of_cooling_time/60);
        const seconds = rest_of_cooling_time - minutes*60;
        setVisibleValue(minutes.toString() + ":" + ((String(seconds).length) > 1 ? '' : '0' ) + seconds.toString());
    },[rest_of_cooling_time]);

    return(
        <OneStepContainer on={on}>
            <div>Жарка</div><div>{VisibleValue}</div>
        </OneStepContainer>
    )
};

const StepsIndicator = () => {
  return (
    <StepsContainer>
        <OneStep name={'Ожидание'} parameter={'stop'}/>
        <OneStepPrepare/>
        <OneStep name={'Загрузка'} parameter={'loading_roaster'}/>
        <OneStepRoast/>
        <OneStepCooling/>
        {/*<OneStep name={'Выгрузка'} parameter={'unloading_cooler'}/>*/}
    </StepsContainer>
  )
};

export default StepsIndicator;
