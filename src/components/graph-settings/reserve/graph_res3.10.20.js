import React, {Fragment, useEffect, useState, useLayoutEffect} from "react";
import './graph.scss'
import {useDispatch, useSelector} from "react-redux";
import Axes from "./axes"
import AxesText from "./axes-text"
import {SVGgraph, SVGadditional, SVGbackground, SVGcontainer, SVGcursor} from "./styled-components"

const GraphSettings = ({parameters = {}}) => {

  const { VirtualWidth = 900, VirtualHeight = 100, Width = 900, Height = 400,
    border = 50, indent = 20} = parameters;

  const WidthInner = Width-border;
  const HeightInner = Height-border;
  const Xkoef = WidthInner/VirtualWidth;
  const Ykoef = HeightInner/VirtualHeight;

  const dispatch = useDispatch();

  const [heat_setting_arr_path, set_heat_setting_arr_path] = useState("M 0 0");
  const heat_setting_arr = useSelector(state => state.graphSettingsKeeper.heat_setting_arr);
  const cursor_x = useSelector(state => state.graphSettingsKeeper.cursor_x);
  const cursor_y = useSelector(state => state.graphSettingsKeeper.cursor_y);
  const step = useSelector(state => state.graphSettingsKeeper.step);


  useEffect(() => {
    let prev_point = -1;
    let buffer = 0;
    const d = heat_setting_arr.reduce((acc, point, i, a) => {
      if (i === 0) {
        buffer = `${acc} ${point[0]} ${-point[1]}`;
        prev_point = point[1];
      } else {
        if (prev_point !== point[1]) {
          buffer = `${acc} L ${point[0]} ${-prev_point} L ${point[0]} ${(-point[1])}`;
          prev_point = point[1];
        } else if (i === 900 ) {
          buffer = `${acc} L ${point[0]} ${-point[1]}`;
        }
        else {
          buffer = `${acc}`
        }}
      return buffer
      }, `M`);
    set_heat_setting_arr_path(d);
    // console.log(d)
  },[heat_setting_arr]);

  const AxesConst = <Axes Ysteps={12}
                          Yinterval={10}
                          Xsteps={18}
                          Xinterval={60}
                          Xfinish={WidthInner} Ystart={-HeightInner} Yfinish={0}
                          Xkoef={Xkoef} Ykoef={Ykoef} indent={indent}
  />;

  const first_color = "#ee443b";

  const heat_setting_arr_fill = heat_setting_arr_path + " V 0 H 0";

  return (
    <Fragment>

    <SVGcontainer width={Width} height={Height}>

      <SVGadditional viewBox={"0 "+ (-Height) + " " + Width + " " + Height}
           width={Width} height={Height} fill="white" preserveAspectRatio="none">
        <g>{AxesText}</g>

      </SVGadditional>

      <SVGbackground viewBox={(-indent/2) + " " +(-HeightInner-indent/2)+ " " +(WidthInner+indent)+ " " +(HeightInner+indent)}
                     width={WidthInner} height={HeightInner} border={border} preserveAspectRatio="none">
        <g >{AxesConst}</g>
      </SVGbackground>

      {/*<SVGgraph preserveAspectRatio="none" height={HeightInner} width={WidthInner} border={border} viewBox={*/}
      {/*  -indent/2 + " "*/}
      {/*  + (-VirtualHeight-indent+(indent/2/Ykoef)) + " " +*/}
      {/* (VirtualWidth+indent)+ " " +*/}
      {/* (VirtualHeight+indent)}*/}
      {/*>*/}

      <SVGgraph preserveAspectRatio="none" height={HeightInner} width={WidthInner} border={border} viewBox={
       -indent/2 + " " +
       -100 + " " +
       (WidthInner)+ " " +
       (HeightInner)}
      >

        <g className="graph_lines">
          <g className="first_graph graph_lines_animate">
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
        <SVGcursor x1={cursor_x} x2={cursor_x} y1={-VirtualHeight-indent+(indent/Ykoef)} y2={0}/>
      </SVGgraph>
    </SVGcontainer>
    </Fragment>
  )
};

export default GraphSettings;
