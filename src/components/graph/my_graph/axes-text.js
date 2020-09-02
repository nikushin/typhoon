import React, {Fragment} from "react";

const AxesText = ({Xsteps, Xinterval, Ysteps, Yinterval, globalY, globalX, height, scale }) =>  {

  let axisYTextArray = [];
  for (let i = 0; i < Ysteps; i++) {
    if (i % 2 !== 0) {
      axisYTextArray.push({ Y : 25 - Yinterval * i, num : -(globalY + height - i*Yinterval*scale) })
    }
  }
  let axisYText = axisYTextArray.map((interval) =>
    <Fragment>
      <text className = "AxesText" x = "20" y = {interval.Y} >
        {(interval.num).toFixed(0)}
      </text>
    </Fragment>
  );
  let DinamicSeconds = 0;
  let axisXTextArray = [];
  for (let i = 1; i < Xsteps; i++) {
      DinamicSeconds = Number(Xinterval * i * scale + globalX + 20).toFixed(0);
      const minutes = Math.floor(DinamicSeconds/60);
      const seconds = DinamicSeconds - minutes*60;
      axisXTextArray.push({ X : Xinterval * i + 35, num : minutes + ':' + ((String(seconds).length) > 1 ? '' : '0' ) + seconds  })
  }
  let axisXText = axisXTextArray.map((interval) =>
    <Fragment>
      <text className = "AxesText" x = {interval.X} y = "32" >
        {interval.num}
      </text>
    </Fragment>
  );

  return (
    <Fragment>
      <g>
        {axisYText}
        {axisXText}
        <text className = "AxesText" x = "20" y = "-375" > °C </text>
      </g>
    </Fragment>
  )
};

export default AxesText;
