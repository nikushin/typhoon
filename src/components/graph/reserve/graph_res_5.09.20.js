import React, {Fragment, useEffect, useState, useLayoutEffect} from "react";
import './graph.scss'
import {useDispatch, useSelector} from "react-redux";
import {GraphSaveViewParameters} from "../../actions/index"
import Axes from "./axes"
import AxesText from "./axes-text"

const Graph = ({parameters = {}}) => {

  const { DefaultWidth = 950, DefaultHeight = 450 } = parameters;

  const DefaultWidthGraph = DefaultWidth - 50;
  const DefaultHeightGraph = DefaultHeight - 50;

  const dispatch = useDispatch();

  // const DefaultWidth = 900;
  // const DefaultHeight = 400;
  const MaxScale = 1.5;
  const MinScale = 0.3;
  const MinY = 20;
  const MaxY = -380;

  const [ViewBoxParameters, SetViewBoxParameters] = useState({
    width: 0, height: 0,
    scale : 0,
    globalX : 0, globalY : 0,
    originGlobalX : 0,
    originGlobalY : 0,
    originLocalX : 0,
    originLocalY : 0,
    movable : false
  });

  const ViewBoxParametersRef = React.useRef({});

  const [Legend, SetLegend] = useState( {first:true, second: true});

  const FirstLegendSwitch = (e) => {
    SetLegend((s) => ({...s, first : !s.first}));
  };

  const SecondLegendSwitch = (e) => {
    SetLegend((s) => ({...s, second : !s.second}));
  };

  // const FirstLegendSwitch = (e) => {
  //   SetLegend((s) => ({...s, first : !s.first}));
  //   if (!Legend.first) { document.querySelector(".first_graph").classList.add("graph_lines_animate"); }
  //   else { document.querySelector(".first_graph").classList.remove("graph_lines_animate"); }
  // };
  //
  // const SecondLegendSwitch = (e) => {
  //   SetLegend((s) => ({...s, second : !s.second}));
  //   if (!Legend.second) { document.querySelector(".second_graph").classList.add("graph_lines_animate"); }
  //   else { document.querySelector(".second_graph").classList.remove("graph_lines_animate"); }
  // };

  const AxesConst = <Axes Ysteps={21}
                          Yinterval={20}
                          Xsteps={16}
                          Xinterval={60}/>;
  const [AxesSvg, SetAxesSvg] = useState(AxesConst);
  useEffect(() => {
    SetAxesSvg(AxesConst)
  },[]);

  const AxesTextConst = <AxesText Ysteps={21}
                              Yinterval={20}
                              Xsteps={16}
                              Xinterval={60}
                              globalY={ViewBoxParameters.globalY}
                              globalX={ViewBoxParameters.globalX}
                              height={ViewBoxParameters.height}
                              scale={ViewBoxParameters.scale}/>;
  const [AxesTextSvg, SetAxesTextSvg] = useState(AxesConst);
  useEffect(() => {
    SetAxesTextSvg(AxesTextConst)
  },[ViewBoxParameters]);

  const graph_start_view_parameters = useSelector(state => state.analogParametersKeeper.graph_save_view_parameters);
  const graph_path_first = useSelector(state => state.analogParametersKeeper.graph_path_first);
  const graph_path_second = useSelector(state => state.analogParametersKeeper.graph_path_second);
  const graph_current_line_x = useSelector(state => state.analogParametersKeeper.graph_current_line_x);
  const graph_current_y_min = useSelector(state => state.analogParametersKeeper.graph_current_y_min);
  const graph_current_y_max = useSelector(state => state.analogParametersKeeper.graph_current_y_max);

  // useEffect(() => {
  //   return () => {
  //     console.log("dispatch " + ViewBoxParameters.width);
  //     dispatch(GraphSaveViewParameters({
  //       width: ViewBoxParameters.width, height: ViewBoxParameters.height,
  //       scale : ViewBoxParameters.scale,
  //       globalX : ViewBoxParameters.globalX, globalY : ViewBoxParameters.globalY
  //     }));
  //   }
  // },[]);

  useEffect(() => {
    console.log("now " + ViewBoxParameters.width);
    ViewBoxParametersRef.current = ViewBoxParameters;
  },[ViewBoxParameters]);

  useEffect(() => {
    return () => {
      console.log("dispatch " + ViewBoxParametersRef.current.width);
      dispatch(GraphSaveViewParameters({
        width : ViewBoxParametersRef.current.width, height: ViewBoxParametersRef.current.height,
        scale : ViewBoxParametersRef.current.scale,
        globalX : ViewBoxParametersRef.current.globalX, globalY : ViewBoxParametersRef.current.globalY
      }));
    }
  },[]);

  useLayoutEffect(() => {
    console.log("selector " + graph_start_view_parameters.width);
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
      globalX : - 20,
      globalY : -380,
      width : DefaultWidthGraph,
      height : DefaultHeightGraph,
      scale : 1.0
    }));
    }
  },[]);

  useEffect(() => {
    if (ViewBoxParameters.height + ViewBoxParameters.globalY > MinY) {
      SetViewBoxParameters ((s) => ({...s, globalY : MinY - s.height}))
    }

    if (ViewBoxParameters.globalY < MaxY && ViewBoxParameters.height <= DefaultHeightGraph) {
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
    globalX: e.deltaY < 0 ? s.globalX + (s.width - DefaultWidthGraph*s.scale)*(e.clientX/DefaultWidthGraph) :
      s.globalX + (s.width - DefaultWidthGraph*s.scale)/2,
    globalY: e.deltaY < 0 ? s.globalY + (s.height - DefaultHeightGraph*s.scale)*(e.clientY/DefaultHeightGraph) :
      s.globalY + (s.height - DefaultHeightGraph*s.scale)/2,
    width : DefaultWidthGraph*s.scale,
    height : DefaultHeightGraph*s.scale,
  }));
  };

  const DoubleClick = () => {

    SetViewBoxParameters((s) => ({ ...s,
      globalX: -20,
      globalY: -380,
      width: DefaultWidthGraph,
      height: DefaultHeightGraph,
      scale: 1.0
    }));
  };

  const MouseMove = (e) => {
    e.persist();
    if (ViewBoxParameters.movable) {
      SetViewBoxParameters((s) => ({ ...s,
        globalX : (s.originLocalX - e.clientX)*s.scale + s.originGlobalX,
        // globalX : s.globalX >= -1000 ? (s.originLocalX - e.clientX)*s.scale + s.originGlobalX : -1000,
        globalY : (s.originLocalY - e.clientY)*s.scale + s.originGlobalY < s.globalY ? //смотрим куда перемещают экран вверх/низ
        // если перемещаем вверх
        ((s.originLocalY - e.clientY)*s.scale + s.originGlobalY < MaxY ? //если выше верхнего предела
        (s.height <= DefaultHeightGraph ? MaxY : s.globalY) : //если большой масштаб - ничего не делаем, т.к. вылезаем полюбому
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

  // const graph_path_first = "M 90 370 120 300 150 320 200 320";
  // const graph_path_second = "M 90 370 130 250 170 300";

  const first_color = "#4bee25";
  const second_color = "#e3e619";
  const graph_path_first_fill = graph_path_first + "V 0 H 1";
  const graph_path_second_fill = graph_path_second + "V 0 H 1";

  return (
    <Fragment>

      <svg className="graph-background" viewBox="0 -380 900 400" height="400" width="900">
        <g >
          {AxesSvg}
        </g>
      </svg>

      <svg className="graph" height={DefaultHeightGraph} width={DefaultWidthGraph} viewBox={
       ViewBoxParameters.globalX + " " +
       ViewBoxParameters.globalY + " " +
       ViewBoxParameters.width + " " +
       ViewBoxParameters.height}
           onMouseDown={MouseDown}
           onMouseUp={MouseUp}
           onMouseMove={MouseMove}
           onDoubleClick={DoubleClick}
           onWheel={Wheel}>

        <g className="graph_lines">
          <g className="first_graph graph_lines_animate">
          <path
                strokeWidth="0px"
                fill={first_color}
                fillOpacity="0.25"
                d={graph_path_first_fill}/>

            <path stroke={first_color} fill="none"
                  d={graph_path_first}
                  onMouseOver={e => console.log(e.clientX)}>
          </path>
          </g>

          <g className="second_graph graph_lines_animate">
          <path strokeWidth="0px"
                fill={second_color}
                fillOpacity="0.25"
                d={graph_path_second_fill}/>
          <path stroke={second_color}  fill="none"
                d={graph_path_second}/>
          </g>
        </g>

        {/*<line className="graph_line"*/}
        {/*      stroke='white' strokeWidth="0.2px"*/}
        {/*      x1={graph_current_line_x} x2={graph_current_line_x}*/}
        {/*      y1={graph_current_y_min} y2={graph_current_y_max}/>*/}

      </svg>

      <svg className="graph-additional" viewBox={"0 -405 950 450"} height="450" width="950" fill="white">
        <g>
          {AxesTextSvg}
        </g>

      </svg>

      <div className="graph-legend-buttons">
        <div style={{ backgroundColor : Legend.first ? first_color : "gray" }} onClick={FirstLegendSwitch}>First</div>
        <div style={{ backgroundColor : Legend.second ? second_color : "gray" }} onClick={SecondLegendSwitch}>Second</div>
      </div>

    </Fragment>
  )
};

export default Graph;
