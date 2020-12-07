import React, {Fragment, memo, useState} from "react";
import Graph from './graph/graph'
import Power from './power/power'
import Parameters from './parameters'

const GraphMain = () => {
  return (
    <Fragment>
      <Graph parameters={Parameters}/>
      <Power parameters={Parameters}/>
    </Fragment>
  )
};

export default GraphMain;
