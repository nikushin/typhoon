import React, {Fragment} from "react";

const AxesText = ({Xsteps, Xinterval, Ysteps, Yinterval, YrorSteps, Yrorinterval, globalY, globalX, height, scale, Ystart,
                    Xkoef, Ykoef, XaxisTextOffset = 40, XaxisTextRorOffset = 857, YaxisTextOffset = 0, TextTemp, TextRor, TextTime,
                    borderLeft, borderRight, borderTop, borderBottom}) =>  {

  let axisYTextArray = [];
  for (let i = 0; i < Ysteps; i++) {
    if (i % 2 !== 0) {
      axisYTextArray.push({ Y :-borderBottom + 6 -(Yinterval * i * Ykoef), num : i*Yinterval*scale - globalY - height })
    }
  }
  let axisYText = axisYTextArray.map((interval) =>
      <TextTemp x = {XaxisTextOffset} y = {interval.Y} >
        {(interval.num).toFixed(0)}
      </TextTemp>
  );

  let axisYTextRorArray = [];
  for (let i = 0; i < YrorSteps; i++) {
      axisYTextRorArray.push({
        Y :-borderBottom + 6 -(Yrorinterval * i * Ykoef) + Ystart* Ykoef,
        num : ((i*Yrorinterval - Ystart)*scale) - globalY - height
      })
  }
  let axisYTextRor = axisYTextRorArray.map((interval) =>
    <TextRor x = {XaxisTextRorOffset} y = {interval.Y} >
      {(interval.num/10).toFixed(0)}
    </TextRor>
  );


  let DinamicSeconds = 0;
  let axisXTextArray = [];
  let minutes = 0;
  let seconds = 0;
  for (let i = 1; i < Xsteps -1; i++) {
      DinamicSeconds = Number(Xinterval * i * scale + globalX).toFixed(0);
      if (DinamicSeconds >= 0) {
      minutes = Math.floor(DinamicSeconds/60);
      seconds = DinamicSeconds - minutes*60;
      } else {
        minutes = Math.floor(Math.abs(DinamicSeconds/60));
        seconds = Math.abs(DinamicSeconds) - minutes*60;
      }
    // console.log('graph', Xkoef);
      axisXTextArray.push({
        X : Xkoef*(Xinterval*i) + borderLeft -13 + ((String(minutes).length) > 1 ? 15 : 12 ), //координата - коррекция по кол-ву минут (растягивание графика не играет роли)
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
        {axisYTextRor}
        <TextTemp x = {XaxisTextOffset} y = {-borderBottom -(Yinterval * (Ysteps-1) * Ykoef)} > °C </TextTemp>
        <TextRor x = {XaxisTextRorOffset-40} y = {(-685)} > °C/30c </TextRor>
      </g>
    </Fragment>
  )
};

export default AxesText;
