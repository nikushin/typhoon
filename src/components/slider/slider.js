import React, {memo, useState, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
// import {newValue} from "../../actions/parameters"
import {showKeyboard, setKeyboardParameter} from "../../actions";

const img_size = 60;
const width = 600;

const sliderThumbStyles = (src_img) => (`
  width: ${img_size}px;
  height: ${img_size}px;
  mask-image: url(${src_img});
  background-color: white;
`);

const ValueDiv = styled.div`
    position: absolute;
    left: ${props => props.value*(width-img_size)/props.max-30+(img_size/2)}px;
    top: 50px;
    font-size: 35px;
    width: 60px;
    text-align: center;
`;

const Track = styled.div`
    position: absolute;
    top: 20px;
    left: ${img_size/2}px;
    width: ${width-img_size}px;
    height: 20px;
    border-radius: 5px;
    background: ${props => props.bg};
`;

const Container = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
  align-items: center;
  div {
  
  }
  input {
    -webkit-appearance: none;
    appearance: none;
    position: absolute;
    top: 20px;
    width: ${width}px;
    height: 20px;
    background: transparent;
    outline: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      ${props => sliderThumbStyles(props.src_img)}
    }
  }
`;

const inactive = '#546568';

const Slider = ({keeper, parameter, src_img, color, min, max, top, left}) => {
  const dispatch = useDispatch();
  const [trackProgress, setTrackProgress] = useState(`linear-gradient(90deg, ${color} 0% 0%, ${inactive} 0% 100%)`);
  const valueGlobal = useSelector(state => state[keeper][parameter]);

  useLayoutEffect(() => {
    const progress = (valueGlobal / max) * 100;
    setTrackProgress(`linear-gradient(90deg, ${color} 0% ${progress}%, ${inactive} ${progress}% 100%)`);
  },[valueGlobal]);

  const handleChange = () => (event) => {
    const value = event.target.value;
    dispatch(setKeyboardParameter({value:Number(value), keeper, parameter}));
  };

  const onClick = (leftBase) => {
    const  left = leftBase + valueGlobal*(width-img_size)/max;
    dispatch(showKeyboard({startValue: valueGlobal, min, max, top, left,
      func: (value) => {dispatch(setKeyboardParameter({value, keeper, parameter }))}
    }));
  };

  return (
    <Container value={valueGlobal} src_img={src_img} >
      <Track bg={trackProgress}/>
      <input type="range" value={valueGlobal} min={min} max={max}
             onChange={handleChange()}/>
      <ValueDiv value={valueGlobal} max={max}
                onClick={() => onClick(left)}>
        {valueGlobal}
      </ValueDiv>
    </Container>
  )
};

export default memo(Slider)
