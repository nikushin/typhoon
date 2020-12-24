import React, {Fragment, useEffect, useState, useLayoutEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Axes from "./axes"
import AxesText from "./axes-text"
import {SVGgraph, SVGadditional, SVGbackground, SVGcontainer, SVGcursor,
  SVGaxes, SVGtextTemp, SVGtextTime} from "./styled-components"

const GraphSettings = ({parameters = {}}) => {

  const {Width = 800, Height = 400, borderTop = 25, borderBottom = 50, indent = 15} = parameters;

  const borderRight = 40 - indent/2;
  const borderLeft = 60 - indent/2;
  const WidthInner = Width-borderLeft-borderRight+indent;
  const HeightInner = Height-borderTop-borderBottom+indent;
  const WidthWorkPlot = Width-borderLeft-borderRight;
  const HeightWorkPlot = Height-borderTop-borderBottom;
  const Xkoef = (WidthWorkPlot)/900;
  const Ykoef = (HeightWorkPlot)/100;

  const [heat_setting_arr_path, set_heat_setting_arr_path] = useState("M 0 0");
  const heat_setting_arr = useSelector(state => state.graphSettingsKeeper.arr_heat);
  const cursor_x = useSelector(state => state.graphSettingsKeeper.cursor_x);

  useLayoutEffect(() => {
    let prev_point = 0;
    let buffer = undefined;
    if (heat_setting_arr.length === 0) {
      buffer = `M 0 0 L ${WidthWorkPlot*Xkoef} 0`
    } else {
      buffer = heat_setting_arr.reduce((acc, point, i, a) => {
        const point_y = point[1] * Ykoef;
        const point_x = point[0] * Xkoef;

        if (i === 0) {
          if (point_x === 0) {
            acc = `M 0 ${-point_y}`;
          } else {
            acc = `M 0 0 L ${point_x} 0 L ${point_x} ${(-point_y)}`;
          }
        } else {
          acc += ` L ${point_x} ${-prev_point} L ${point_x} ${(-point_y)}`;
        }
        prev_point = point_y;
        if (i === heat_setting_arr.length-1) {acc += ` L ${WidthWorkPlot} ${-point_y}`}

        return acc
      }, []);
    }
  set_heat_setting_arr_path(buffer);
  },[heat_setting_arr]);

  const AxesConst = <Axes Ysteps={12}
                          Yinterval={10}
                          Xsteps={18}
                          Xinterval={60}
                          Xfinish={WidthWorkPlot} Ystart={-HeightWorkPlot} Yfinish={0}
                          Xkoef={Xkoef} Ykoef={Ykoef} indent={indent} Axes={SVGaxes}
  />;

  const AxesTextConst = <AxesText Ysteps={11}
                                  Yinterval={10}
                                  Xsteps={16}
                                  Xinterval={60}
                                  Xkoef={Xkoef} Ykoef={Ykoef} indent={indent}
                                  TextTemp={SVGtextTemp} TextTime={SVGtextTime}
                                  indentYkoef={Ykoef} indentXkoef={Xkoef}
                                  borderLeft = {borderLeft} borderRight = {borderRight}
                                  borderTop = {borderTop} borderBottom = {borderBottom}/>;

  const first_color = "#ee443b";

  const heat_setting_arr_fill = heat_setting_arr_path + " V 0 H 0";

  return (
    <Fragment>

    <SVGcontainer width={Width} height={Height}>

      <SVGadditional viewBox={"0 "+ (-Height) + " " + Width + " " + Height}
           width={Width} height={Height} fill="white" preserveAspectRatio="none">
        <g>{AxesTextConst}</g>

      </SVGadditional>

      <SVGbackground width={WidthInner} height={HeightInner} preserveAspectRatio="none"
         borderLeft = {borderLeft} borderRight = {borderRight}
         borderTop = {borderTop} borderBottom = {borderBottom} viewBox={
        (-indent/2) + " " +
        (-HeightInner+indent/2)+ " " +
        (WidthInner)+ " " +
        (HeightInner)}>
        <g >{AxesConst}</g>
      </SVGbackground>

      <SVGgraph width={WidthInner} height={HeightInner} preserveAspectRatio="none"
        borderLeft = {borderLeft} borderRight = {borderRight}
        borderTop = {borderTop} borderBottom = {borderBottom}
        viewBox={
       (-indent/2) + " " +
       (-HeightInner+indent/2) + " " +
       (WidthInner)+ " " +
       (HeightInner)}
      >
        <g>
          <g>
          <path
                strokeWidth="0px"
                fill={first_color}
                fillOpacity="0.25"
                d={heat_setting_arr_fill}/>

            <path stroke={first_color} fill="none"
                  d={heat_setting_arr_path}>
          </path>
          </g>
        </g>
        <SVGcursor x1={cursor_x*Xkoef} x2={cursor_x*Xkoef} y1={-HeightWorkPlot} y2={0}/>
      </SVGgraph>
    </SVGcontainer>
    </Fragment>
  )
};

export default GraphSettings;
