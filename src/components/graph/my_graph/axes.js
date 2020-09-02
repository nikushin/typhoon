import React, {Fragment} from "react";

const Axes = ({Xsteps, Xinterval, Ysteps, Yinterval}) =>  {

    let axisYarray = [];
    for (let i = 0; i < Ysteps; i++) {
      axisYarray.push(20 -Yinterval * i)
    }
    let axisY = axisYarray.map((interval) =>
      <Fragment>
        <line className="Axes" x1="0" x2="900" y1={interval} y2={interval}/>
      </Fragment>
    );

  let axisXarray = [];
  for (let i = 0; i < Xsteps; i++) {
    axisXarray.push(Xinterval * i)
  }
  let axisX = axisXarray.map((interval) =>
      <line className="Axes" x1={interval} x2={interval} y1="-380" y2="20"/>
  );

  return (
    <Fragment>
      <g>{axisY}</g>
      <g>{axisX}</g>
    </Fragment>
  )
};

export default Axes;
