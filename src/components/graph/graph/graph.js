import React, {Fragment, useEffect, useState, useLayoutEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GraphSaveViewParameters, GraphSaveAnswer} from "../../../actions/graph"
import Axes from "./axes"
import AxesText from "./axes-text"
import {SVGgraph, SVGadditional, SVGbackground, SVGcontainer, SaveRuqest,
  SVGrealTimeLinesContainer, SVGrealTimeLineG, SVGaxes, SVGtextTime, SVGtextTemp, SVGtextRor,
  SVGLegendsContainer, SVGLegendsButton} from "./styled-graph"
//import {SVGcursor} from "../../graph-settings/styled-components";

const Graph = ({parameters}) => {

  const { GraphVirtualWidth, GraphVirtualHeight, Width, GraphHeight,
    Xstart, Ystart,
    GraphBorderLeft, GraphBorderRight, GraphBorderTop, GraphBorderBottom,
    GraphWidthInner, GraphHeightInner, Xkoef, GraphYkoef} = parameters;

  const dispatch = useDispatch();

  const MaxScale = 1.5;
  const MinScale = 0.3;
  const MinY = -Ystart; //25
  const MaxY = -GraphVirtualHeight + MinY; //-375

  const [ViewBoxParameters, SetViewBoxParameters] = useState({
    width: 0, height: 0, scale : 0, globalX : 0, globalY : 0, originGlobalX : 0,
    originGlobalY : 0, originLocalX : 0, originLocalY : 0, movable : false
  });

  const ViewBoxParametersRef = React.useRef({});

  const [Legend, SetLegend] = useState( {beans:true, beans_transform: 0,
    air: true, air_transform: 0, ror:true, ror_transform: 0,});

  const getTransform = (id) => {
    const el = document.getElementById(id);
    const st = window.getComputedStyle(el, null);
    const tr = st.getPropertyValue("transform");
    let value = tr.split('(')[1];
    value = value.split(')')[0];
    value = value.split(',');
    return value[3]
  };

  const BeansLegendSwitch = (e) => {
    const tr = getTransform('BeansRealTimeLineG');
    SetLegend((s) => ({...s, beans : !s.beans, beans_transform: tr}));
  };

  const AirLegendSwitch = (e) => {
    const tr = getTransform('AirRealTimeLineG');
    SetLegend((s) => ({...s, air : !s.air, air_transform: tr}));
  };

  const RorLegendSwitch = (e) => {
    const tr = getTransform('RorRealTimeLineG');
    SetLegend((s) => ({...s, ror : !s.ror, ror_transform: tr}));
  };

  const graph_start_view_parameters = useSelector(state => state.graphKeeper.graph_save_view_parameters);
  const graph_path_beans = useSelector(state => state.graphKeeper.path_beans);
  const graph_path_air = useSelector(state => state.graphKeeper.path_air);
  const graph_path_ror = useSelector(state => state.graphKeeper.path_ror);
  const graph_start_time = useSelector(state => state.graphKeeper.graph_start_time);
  const graph_save_request = useSelector(state => state.graphKeeper.graph_save_request);

  const AxesConst = <Axes Ysteps={16}
                          Yinterval={25}
                          Xsteps={17}
                          Xinterval={60}
                          Xstart={0} Xfinish={GraphWidthInner} Ystart={-GraphHeightInner} Yfinish={0}
                          Xkoef={Xkoef} Ykoef={GraphYkoef} Axes={SVGaxes}
  />;
  const [AxesSvg, SetAxesSvg] = useState(AxesConst);
  useEffect(() => {
    SetAxesSvg(AxesConst)
  },[]);

  const AxesTextConst = <AxesText YrorSteps={8} Yrorinterval={50}
                                  Ysteps={17} Yinterval={25}
                                  Xsteps={17} Xinterval={60}
                                  globalY={ViewBoxParameters.globalY} Ystart={Ystart}
                                  globalX={ViewBoxParameters.globalX}
                                  height={ViewBoxParameters.height}
                                  scale={ViewBoxParameters.scale}
                                  Xkoef={Xkoef} Ykoef={GraphYkoef}
                                  TextTemp={SVGtextTemp} TextRor={SVGtextRor} TextTime={SVGtextTime}
                                  borderLeft = {GraphBorderLeft} borderRight = {GraphBorderRight}
                                  borderTop = {GraphBorderTop} borderBottom = {GraphBorderBottom}
  />;
  const [AxesTextSvg, SetAxesTextSvg] = useState(AxesTextConst);

  useEffect(() => {
    SetAxesTextSvg(AxesTextConst)
  },[ViewBoxParameters]);

  useEffect(() => {
    ViewBoxParametersRef.current = ViewBoxParameters;
  },[ViewBoxParameters]);

  useEffect(() => {
    return () => {

      // console.log("dispatch " + ViewBoxParametersRef.current.width);
      dispatch(GraphSaveViewParameters({
        width : ViewBoxParametersRef.current.width, height: ViewBoxParametersRef.current.height,
        scale : ViewBoxParametersRef.current.scale,
        globalX : ViewBoxParametersRef.current.globalX, globalY : ViewBoxParametersRef.current.globalY
      }));
    }
  },[]);

  useEffect(() => {
    if (graph_start_view_parameters.width) {
      SetViewBoxParameters((s) => ({ ...s,
        globalX : graph_start_view_parameters.globalX,
        globalY : graph_start_view_parameters.globalY,
        width : graph_start_view_parameters.width,
        height : graph_start_view_parameters.height,
        scale : graph_start_view_parameters.scale
      }));
    } else {
    SetViewBoxParameters((s) => ({ ...s,
      globalX : -60,
      globalY : -375,
      width : GraphVirtualWidth,
      height : GraphVirtualHeight,
      scale : 1.0
    }));
    }
  },[]);

  useEffect(() => {
    if (ViewBoxParameters.height + ViewBoxParameters.globalY > MinY) {
      SetViewBoxParameters ((s) => ({...s, globalY : MinY - s.height}))
    }

    if (ViewBoxParameters.globalY < MaxY && ViewBoxParameters.height <= GraphVirtualHeight) {
      SetViewBoxParameters ((s) => ({...s, globalY : MaxY}))
    }

  },[ViewBoxParameters.height, ViewBoxParameters.globalY]);

  const Wheel = (e) => {
    e.persist();
    if (e.deltaY > 0) {
      SetViewBoxParameters ((s) => s.scale >= MaxScale ? s : {...s, scale : s.scale + 0.05} )
    } else if (e.deltaY < 0) {
      SetViewBoxParameters ((s) => s.scale <= MinScale ? s : {...s, scale : s.scale - 0.05} )
    }

  SetViewBoxParameters((s) => ({ ...s,
    globalX: e.deltaY < 0 ? s.globalX + (s.width - GraphVirtualWidth*s.scale)*(e.clientX/GraphVirtualWidth) :
      s.globalX + (s.width - GraphVirtualWidth*s.scale)/2,
    globalY: e.deltaY < 0 ? s.globalY + (s.height - GraphVirtualHeight*s.scale)*(e.clientY/GraphVirtualHeight) :
      s.globalY + (s.height - GraphVirtualHeight*s.scale)/2,
    width : GraphVirtualWidth*s.scale,
    height : GraphVirtualHeight*s.scale,
  }));
  };

  const DoubleClick = () => {

    SetViewBoxParameters((s) => ({ ...s,
      globalX: Xstart,
      globalY: MaxY,
      width: GraphVirtualWidth,
      height: GraphVirtualHeight,
      scale: 1.0
    }));
  };

  const MouseMove = (e) => {
    e.persist();
    if (ViewBoxParameters.movable) {
      SetViewBoxParameters((s) => ({ ...s,
        globalX : (s.originLocalX - e.clientX)*s.scale + s.originGlobalX,
        globalY : (s.originLocalY - e.clientY)*s.scale + s.originGlobalY < s.globalY ? //смотрим куда перемещают экран вверх/низ
        // если перемещаем вверх
        ((s.originLocalY - e.clientY)*s.scale + s.originGlobalY < MaxY ? //если выше верхнего предела
        (s.height <= GraphVirtualHeight ? MaxY : s.globalY) : //если большой масштаб - ничего не делаем, т.к. вылезаем полюбому
        (s.originLocalY - e.clientY)*s.scale + s.originGlobalY) : //если все хорошо - перемещаем
        //если перемещаем вниз
        (s.originLocalY - e.clientY)*s.scale + s.originGlobalY + s.height > MinY ? MinY - s.height : //если уперлись - минимальная высота
        ((s.originLocalY - e.clientY)*s.scale + s.originGlobalY ) //если все хорошо - крутим вниз
      }));
    }
  };

  const MouseDown = (e) => {
    e.persist();
    if (e.button === 0) {
      SetViewBoxParameters((s) => ({ ...s,
        movable: true,
        originGlobalX : s.globalX, originGlobalY : s.globalY, originLocalX : e.clientX, originLocalY : e.clientY
      }));
    }
  };

  const MouseUp = (e) => {
    e.persist();
    if (e.button === 0) {
      SetViewBoxParameters((s) => ({ ...s,
      movable: false
    }));
    }};

  const MouseOut = () => {
      SetViewBoxParameters((s) => ({ ...s,
        movable: false
      }));
    };

  const bean_color = "#4bee25";
  const air_color = "#e6dc4f";
  const ror_color = "#3f99e6";

  const graph_path_beans_fill = graph_path_beans + "V 0 H " + graph_start_time;
  const graph_path_air_fill = graph_path_air + "V 0 H " + graph_start_time;
  const graph_path_ror_fill = graph_path_ror + "V 0 H " + graph_start_time;
  return (
    <Fragment>

      {/*<SVGLegendsContainer className="graph-legend-buttons">*/}
      {/*  <SVGLegendsButton On={Legend.beans} Color={bean_color} onClick={BeansLegendSwitch}>Beans</SVGLegendsButton>*/}
      {/*  <SVGLegendsButton On={Legend.air} Color={air_color} onClick={AirLegendSwitch}>Air</SVGLegendsButton>*/}
      {/*  <SVGLegendsButton On={Legend.ror} Color={ror_color} onClick={RorLegendSwitch}>Ror</SVGLegendsButton>*/}
      {/*</SVGLegendsContainer>*/}

    <SVGcontainer width={Width} height={GraphHeight}>

      <SaveRuqest visible={graph_save_request}>Сохранить?
        <button onClick={() => GraphSaveAnswer(true)}>Да</button>  <button onClick={() => GraphSaveAnswer(false)}>Нет</button>
      </SaveRuqest>

      <SVGadditional viewBox={"0 "+ (-GraphHeight) + " " + Width + " " + GraphHeight}
                     width={Width} height={GraphHeight} fill="white" preserveAspectRatio="none">
        <g>{AxesTextSvg}</g>

      </SVGadditional>

      <SVGbackground viewBox={"0 " +(-GraphHeightInner)+ " " +GraphWidthInner+ " " +GraphHeightInner}
                     width={GraphWidthInner} height={GraphHeightInner} preserveAspectRatio="none"
                     borderLeft = {GraphBorderLeft} borderRight = {GraphBorderRight}
                     borderTop = {GraphBorderTop} borderBottom = {GraphBorderBottom}>
        <g >{AxesSvg}</g>
      </SVGbackground>

      <SVGgraph preserveAspectRatio="none" height={GraphHeightInner} width={GraphWidthInner}
                borderLeft = {GraphBorderLeft} borderRight = {GraphBorderRight}
                borderTop = {GraphBorderTop} borderBottom = {GraphBorderBottom}
                viewBox={
       ViewBoxParameters.globalX + " " +
       ViewBoxParameters.globalY + " " +
       ViewBoxParameters.width + " " +
       ViewBoxParameters.height}
                onMouseDown={MouseDown}
                onMouseUp={MouseUp}
                onMouseMove={MouseMove}
                onDoubleClick={DoubleClick}
                onWheel={Wheel}
                onMouseLeave={MouseOut}
      >

        {/*<SVGrealTimeLinesContainer>*/}
          <SVGrealTimeLineG id="BeansRealTimeLineG" Visible={Legend.beans} Transform={Legend.beans_transform}>
          {/*<path*/}
          {/*      strokeWidth="0px"*/}
          {/*      fill={bean_color}*/}
          {/*      fillOpacity="0.25"*/}
          {/*      d={graph_path_beans_fill}/>*/}

            <path stroke={bean_color} fill="none"
                  d={graph_path_beans}
                  //onMouseOver={e => console.log(e.clientX)}
            />
          </SVGrealTimeLineG>

          <SVGrealTimeLineG id="AirRealTimeLineG" Visible={Legend.air} Transform={Legend.air_transform}>
          {/*<path strokeWidth="0px"*/}
          {/*      fill={air_color}*/}
          {/*      fillOpacity="0.25"*/}
          {/*      d={graph_path_air_fill}/>*/}
          <path stroke={air_color}  fill="none"
                d={graph_path_air}/>
          </SVGrealTimeLineG>

          <SVGrealTimeLineG id="RorRealTimeLineG" Visible={Legend.ror} Transform={Legend.ror_transform}>
            {/*<path strokeWidth="0px"*/}
            {/*      fill={ror_color}*/}
            {/*      fillOpacity="0.25"*/}
            {/*      d={graph_path_ror_fill}/>*/}
            <path stroke={ror_color}  fill="none"
                  d={graph_path_ror}/>
          </SVGrealTimeLineG>

        {/*</SVGrealTimeLinesContainer>*/}
        {/*<line stroke={'white'} x1={0} x2={120} y1={-50} y2={-50}/>*/}
      </SVGgraph>

    </SVGcontainer>
    </Fragment>
  )
};

export default Graph;
