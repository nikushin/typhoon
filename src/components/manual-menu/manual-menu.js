import React, {useEffect, useState, Fragment} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setKeyboardParameter, showKeyboard} from "../../actions";

const Container = styled.div`
margin-top: 50px;
padding-top: 20px;
width: 500px;
height: 500px;
font-size: 40px;
background-color: rgb(61,61,61);
    >div{
        margin: 10px 30px 25px 30px;
        padding: 10px 15px 10px 15px;
        display: flex;
        justify-content: space-between;
    }
    > div:first-child {
        justify-content: center;
    }
   
`;

const OneBarDiv = styled.div`
  background-color: ${props => props.on ? "#2ea58f" : "rgb(90,90,90)"};
`;

const OneBarRightSide = ({second_param}) => {
    const dispatch = useDispatch();
    const param = useSelector(state => state.ManualKeeper[second_param]);
    const showKeyboardOnClick = () =>
    {
        dispatch(showKeyboard({startValue: param, min: 0, max: 250, top:500, left:1400,
            func: (value) => {
                dispatch(setKeyboardParameter({value: value, keeper: 'ManualKeeper', parameter: second_param }))}
        }));
    };
    return (
        <div onClick={showKeyboardOnClick}>
        {param}
        </div>
    )
};

const OneBar = ({first_param, second_param, title}) => {
    const dispatch = useDispatch();
    const [Children, setChildren] = useState(undefined);
    const param = useSelector(state => state.ManualKeeper[first_param]);
    const Click = () => {
        dispatch({type: 'MANUAL_SWITCH_REQUEST', payload: first_param})
    };

    useEffect(() => {

        const getRightSide = () => {
            if (second_param) {
                return <OneBarRightSide second_param={second_param}/>
            } else {
                return undefined
            }
        };

        setChildren(
            <Fragment>
                <div onClick={Click}>{title}</div>
                <div>{getRightSide()}</div>
            </Fragment>)
    },[]);

    return (
        <OneBarDiv on={param}>
            {Children}
        </OneBarDiv>
    )
};

const ManualMenu = () => {
    return (
        <Container>
            <OneBar first_param={'on'} title={'Ручной режим'}/>
            <OneBar first_param={'vds'} second_param={'vds_fr'} title={'ВВД'}/>
            <OneBar first_param={'heat'} second_param={'temp_sp'} title={'Нагрев'}/>
            <OneBar first_param={'blades'} title={'Мешалка'}/>
            <OneBar first_param={'cooler'} title={'Охладитель'}/>
        </Container>
    )
};

export default ManualMenu