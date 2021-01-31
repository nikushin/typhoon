import React, {Fragment, useEffect, useState, memo, useLayoutEffect} from "react";
import {useSelector} from "react-redux";
import Axes from "./axes"
import AxesText from "./axes-text"
import {SVGgraphPower, SVGadditionalPower, SVGbackgroundPower, SVGcontainerPower,
  SVGaxesPower, SVGtextTime, SVGtextTemp} from "./styled-power"

const GraphPower = ({parameters}) => {


  const { Width, PowerHeight, PowerIndent, PowerBorderRight, PowerBorderTop,
    PowerBorderBottom, PowerBorderLeft, PowerWidthInner, PowerHeightInner, PowerWidthWorkPlot, PowerHeightWorkPlot,
     PowerYkoef , Xkoef} = parameters;
  const PowerYkoefText = PowerYkoef;
  const heat_setting_arr = useSelector(state => state.graphSettingsKeeper.heat_setting_arr);
  const heat_arr_done = useSelector(state => state.graphSettingsKeeper.heat_arr_done);
  const heat_arr_done_history = useSelector(state => state.graphSettingsKeeper.heat_arr_done_history);
  const roast_second = useSelector(state => state.graphKeeper.roast_second);
  const real_time = useSelector(state => state.graphKeeper.real_time);
  const roast_time_history = useSelector(state => state.graphSettingsKeeper.roast_time_history);

  const path_arr_heat = useSelector(state => state.graphKeeper.path_arr_heat);
  const path_arr_done = useSelector(state => state.graphKeeper.path_arr_done);

  // useEffect(() => {
  //   console.log('power', path_arr_done)
  // });

  const AxesConst = <Axes Ysteps={6}
                          Yinterval={20}
                          Xsteps={18}
                          Xinterval={60}
                          Xfinish={PowerWidthWorkPlot} Ystart={-PowerHeightWorkPlot} Yfinish={0}
                          Xkoef={Xkoef} Ykoef={PowerYkoef} indent={PowerIndent} Axes={SVGaxesPower}
  />;

  const AxesTextConst = <AxesText Ysteps={6}
                                  Yinterval={20}
                                  Xsteps={16}
                                  Xinterval={60}
                                  Xkoef={Xkoef} Ykoef={PowerYkoefText} indent={PowerIndent} TextTime={SVGtextTime} TextTemp={SVGtextTemp}
                                  HeightInner={PowerHeightInner} Height={PowerHeight}
                                  //indentYkoef={indentYkoef} indentXkoef={indentXkoef}
                                  borderLeft = {PowerBorderLeft} borderRight = {PowerBorderRight}
                                  borderTop = {PowerBorderTop} borderBottom = {PowerBorderBottom}/>;

  const color_done = "#ee443b";
  const color_not_done = "#bedbd8";

  const heat_arr_done_path_fill = path_arr_done + ` V 0 H 0`;
  const heat_setting_arr_fill = path_arr_heat + ` V 0 H ${roast_second*Xkoef}`;
  return (
    <Fragment>

      <SVGcontainerPower width={Width} height={PowerHeight}>

        <SVGadditionalPower viewBox={"0 "+ (-PowerHeight) + " " + Width + " " + PowerHeight}
                            width={Width} height={PowerHeight} fill="white" preserveAspectRatio="none">
          <g>{AxesTextConst}</g>

        </SVGadditionalPower>

        <SVGbackgroundPower width={PowerWidthInner} height={PowerHeightInner} preserveAspectRatio="none"
                            borderLeft = {PowerBorderLeft} borderRight = {PowerBorderRight}
                            borderTop = {PowerBorderTop} borderBottom = {PowerBorderBottom} viewBox={
          (-PowerIndent/2) + " " +
          (-PowerHeightInner+PowerIndent/2)+ " " +
          (PowerWidthInner)+ " " +
          (PowerHeightInner)}>
          <g >{AxesConst}</g>
        </SVGbackgroundPower>

        <SVGgraphPower width={PowerWidthInner} height={PowerHeightInner} preserveAspectRatio="none"
                       borderLeft = {PowerBorderLeft} borderRight = {PowerBorderRight}
                       borderTop = {PowerBorderTop} borderBottom = {PowerBorderBottom}
                       viewBox={
                    (-PowerIndent/2) + " " +
                    (-PowerHeightInner+PowerIndent/2) + " " +
                    (PowerWidthInner)+ " " +
                    (PowerHeightInner)}
        >
          <g>
            <g>
              <path
                strokeWidth="0px"
                fill={color_done}
                fillOpacity="0.5"
                d={heat_arr_done_path_fill}/>

              <path stroke={color_done} fill="none"
                    d={path_arr_done}>
              </path>
            </g>

            <g>
              <path
                strokeWidth="0px"
                fill={color_not_done}
                fillOpacity="0.25"
                d={heat_setting_arr_fill}/>

              <path stroke={color_not_done} fill="none"
                    d={path_arr_heat}>
              </path>
            </g>

          </g>
        </SVGgraphPower>
      </SVGcontainerPower>
    </Fragment>
  )
};

export default GraphPower;
