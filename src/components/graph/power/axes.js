import React, {Fragment} from "react";

const Axes = ({Xsteps, Xinterval, Ysteps, Yinterval,
                Xfinish, Ystart, Yfinish, Xkoef, Ykoef, Axes}) =>  {

  let axisYarray = [];
  for (let i = 0; i < Ysteps; i++) {
    axisYarray.push(-Yinterval * i* Ykoef)
  }
  let axisY = axisYarray.map((interval) => //horizontal
    <Axes x1={0} x2={Xfinish} y1={interval} y2={interval}/>
  );

  let axisXarray = [];
  for (let i = 0; i < Xsteps; i++) {
    axisXarray.push(Xinterval * i * Xkoef)
  }
  let axisX = axisXarray.map((interval) => //vertical
    <Axes x1={interval} x2={interval} y1={Ystart} y2={Yfinish}/>
  );

  return (
    <Fragment>
      <g>{axisY}</g>
      <g>{axisX}</g>
    </Fragment>
  )
};

export default Axes;
