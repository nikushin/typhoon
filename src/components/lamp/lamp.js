import {useSelector} from "react-redux";
import React from "react";
import './lamp.css'

const Lamp = ({parameter}) => {
  const on = useSelector(state => state.analogParametersKeeper[parameter]);
  const color = useSelector(state => state.valueKeeper.globalColor);

  const lampStyle = (on) => {
    if (on) {
      return (
        {backgroundColor: `rgb(${color.color})`,
      boxShadow: `rgb(${color.color}) 0 0 8px 2px, rgba(0, 0, 0, 0.9) 1px 1px 0 0, rgba(255, 255, 255, 0.1) -1px -1px 0 0`}
    )} else {
      return ({
        backgroundColor: 'rgb(110, 110, 110)',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0 0 8px -1px inset, rgba(0, 0, 0, 0.6) 0 0 4px 0 inset, rgba(0, 0, 0, 0.9) -1px -1px 0 0, rgba(255, 255, 255, 0.1) 1px 1px 0 0'
    })}};

  return (
    <div className={`${on ? "lamp-on" : "lamp-off"}` } style={lampStyle(on)}>
    </div>
  )
};

export default Lamp
