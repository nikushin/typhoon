import React, {memo, useState, useLayoutEffect, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import socketService from "../../services/socket-service";
// import {newValue} from "../../actions/parameters"
import {showKeyboard, setKeyboardParameter} from "../../actions";

const img_size = 60;
const width = 550;

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
    &::-moz-range-thumb {
    ${props => sliderThumbStyles(props.src_img)}
    }
    
    }
  }
`;

const inactive = '#546568';

export const Slider = memo(({keeper, parameter, src_img, color, min, max, top, left}) => {
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
});

export const SliderHeat = memo(({src_img, min, max, top, left}) => {
    const dispatch = useDispatch();
    const [Color, setColor] = useState('#ef1b14');
    const [VisibleValue, setVisibleValue] = useState(0);
    const [trackProgress, setTrackProgress] = useState(`linear-gradient(90deg, ${Color} 0% 0%, ${inactive} 0% 100%)`);
    const heat_power_indicator = useSelector(state => state.analogParametersKeeper.heat_power_indicator);
    const HeatOn = useSelector(state => state.analogParametersKeeper.heat_lamp);
    const roast_mode = useSelector(state => state.graphKeeper.roast_mode);

    useLayoutEffect(() => {
        if (HeatOn) {
            setColor('#ef1b14')
        } else {
            setColor('#ef5851')
        }
    },[HeatOn]);

    useLayoutEffect(() => {
        setVisibleValue(heat_power_indicator[0]);
    },[heat_power_indicator]);


    useLayoutEffect(() => {
        const progress = (VisibleValue / max) * 100;
        setTrackProgress(`linear-gradient(90deg, ${Color} 0% ${progress}%, ${inactive} ${progress}% 100%)`);
    },[VisibleValue]);

    const handleChange = () => (event) => {
        const value = event.target.value;
        setVisibleValue(value);
        socketService.SocketEmmit('memory_change', {'heat_manual_sp': Number(value)});
    };

    const onClick = (leftBase) => {
        const  left = leftBase + VisibleValue*(width-img_size)/max;
        dispatch(showKeyboard({startValue: VisibleValue, min, max, top, left,
            func: (value) => {
                socketService.SocketEmmit('memory_change', {'heat_manual_sp': value});
                setVisibleValue(value);
        }}));};

    return (
        <Container value={VisibleValue} src_img={src_img} >
            <Track bg={trackProgress}/>
            <input type="range" value={VisibleValue} min={min} max={max} disabled={roast_mode !== 'manual'}
                   onChange={handleChange()}/>
            <ValueDiv value={VisibleValue} max={max}
                      onClick={() => onClick(left)}>
                {VisibleValue}
            </ValueDiv>
        </Container>
    )
});