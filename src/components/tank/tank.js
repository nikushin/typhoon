import React, {memo} from 'react';
import './tank.css'
import {useSelector} from "react-redux";

const Tank = ({parameter}) => {
  const fill = useSelector(state => state.analogParametersKeeper[parameter]);
  const color = useSelector(state => state.mainKeeper.globalColor);

  const tankStyle = {background: `linear-gradient(0deg, rgba(0, 0, 0, 0.7) 30%, rgba(255, 255, 255, 0.7) 100%) rgb(${color.color})`,
          boxShadow: `rgba(${color.color}, 0.7) 0 0 6px 1px`,
          height: fill + 'px'};
  // console.log('tank')
  return (
    <div className={'tank-container'}>
      <div style={ tankStyle } className={'tank-fill'}>
      </div>
    </div>
  )
};

export default memo(Tank)
