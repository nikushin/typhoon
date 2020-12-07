import React, {Fragment} from "react";

const AxesText = ({Xsteps, Xinterval, Ysteps, Yinterval, height, indent,
                    Xkoef, Ykoef, XaxisTextOffset = 45, YaxisTextOffset = -13, TextTemp, TextTime,
                    borderLeft,  borderRight, borderTop, borderBottom}) =>  {

  let axisYTextArray = [];
  for (let i = 0; i < Ysteps; i++) {
    axisYTextArray.push({ Y :7-borderBottom+indent/2 -(Yinterval * i * Ykoef), num : i*Yinterval })
  }
  let axisYText = axisYTextArray.map((interval) =>
      <TextTemp x = {XaxisTextOffset} y = {interval.Y}>
        {(interval.num).toFixed(0)}
      </TextTemp>
  );
  let DinamicSeconds = 0;
  let axisXTextArray = [];
  let minutes = 0;
  let seconds = 0;
  for (let i = 1; i < Xsteps -1; i++) {
      DinamicSeconds = Number(Xinterval * i).toFixed(0);
      if (DinamicSeconds >= 0) {
      minutes = Math.floor(DinamicSeconds/60);
      seconds = DinamicSeconds - minutes*60;
      } else {
        minutes = Math.floor(Math.abs(DinamicSeconds/60));
        seconds = Math.abs(DinamicSeconds) - minutes*60;
      }

      axisXTextArray.push({
        X : Xkoef*(Xinterval*i) + indent/2 + borderLeft -13 + ((String(minutes).length) > 1 ? 15 : 12 ), //координата - коррекция по кол-ву минут (растягивание графика не играет роли)
        num : (DinamicSeconds < 0 ? "-" : "") + minutes + ':' + ((String(seconds).length) > 1 ? '' : '0' ) + seconds  }) //значение

  }
  let axisXText = axisXTextArray.map((interval) =>
      <TextTime x = {interval.X} y = {YaxisTextOffset} >
        {interval.num}
      </TextTime>
  );

  return (
    <Fragment>
      <g>
        {axisYText}
        {axisXText}
        <TextTemp x = {XaxisTextOffset-3} y = {-7-borderBottom -(Yinterval * (Ysteps-1) * Ykoef)} > % </TextTemp>
      </g>
    </Fragment>
  )
};

export default AxesText;
