import React, {useEffect, useState} from 'react';
import { Scatter } from 'react-chartjs-2';
import './graph.css'
import {MyContext} from '../../index.js'
import {useSelector} from "react-redux";

import store from '../../store';

const Graph = () => {
  // const SocketData = useSelector(state => state.analogParametersKeeper.graph_temp);
  const SocketData = store.getState().analogParametersKeeper.graph_temp;
  console.log(SocketData);

  const [SocketDataState, setSocketDataState] = useState(null);

  const chart = () => {
    setSocketDataState(SocketData)
  };

  useEffect(() => {
    chart();
  });

  const getXtitle = (value) => {
    const minutes = Math.floor(value / 60);
    const seconds = value - minutes*60;
    return (minutes + ':' + seconds + ((String(seconds).length) > 1 ? '' : '0' ))
    // switch (minutes) {
        // case 0: return "";
        // case 1: return "1:00";
        // case 2: return "2:00";
        // case 3: return "1";
        // case 4: return "1";
        // case 5: return "1";
        // case 6: return "1";
        // case 7: return "1";
        // case 8: return "1";
        // case 9: return "1";
        //
        // default: return 'def';
      // }
  };

  const getYtitle = (index, value) => {
    return (index > 13 || index < 1? '' : value )
  };

  const data = {
    datasets: [
      {
        showLine: true,
        label: 'Up',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointHoverRadius: 0,
        pointRadius: 0,
        data: SocketDataState
        // data: [
        //   {x: 10, y: 50},
        //   {x: 20, y: 75},
        //   {x: 30, y: 25},
        //   {x: 40, y: 30},
        //   {x: 400, y: 100},
        //   {x: 500, y: 200},
        //   {x: 700, y: 150}
        //   ]
      },
      {
        showLine: true,
        label: 'Down',
        fill: true,
        backgroundColor: 'rgba(192,102,88,0.4)',
        borderColor: 'rgb(192,102,88)',
        pointHoverRadius: 0,
        pointRadius: 0,
        data: [
          {x: 0, y: 15},
          {x: 30, y: 180},
          {x: 50, y: 200},
          {x: 240, y: 230},
          {x: 300, y: 190},
          {x: 450, y: 210},
          {x: 630, y: 220}
        ]
      }
    ]
  };

  const options = {
    scales: {
      xAxes: [{
        display: true,
        gridLines: {color:'white', drawTicks: false},
        scaleLabel: {
          display: true,
          labelString: 'Время',
          fontColor:'white',
          fontSize:10
        },
        ticks: {
          stepSize: 60,
          maxTicksLimit: 30,
          fontColor: "white",
          fontSize: 14,
          min: 0, max: 900,
          // suggestedMin: 0,
          // suggestedMax: 900,
          padding: 7,
          callback: function(value, index, values) {
            return (getXtitle(value))
          }
        }
      }],
        yAxes: [{
        gridLines: {color:'white', drawTicks: false},
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Температура',
          fontColor: 'white',
          fontSize:10
        },
        ticks: {
          maxTicksLimit: 20,
          fontColor: "white",
          fontSize: 14,
          padding: 7,
          suggestedMin: 0,
          suggestedMax: 300,
          callback: function(value, index, values) {
            return (getYtitle(index, value))
          }
        }
      }]
    },
    legend : {
      labels: {
        fontColor: 'white',
        boxWidth: 10
      }
    },
    tooltips : false
  };

      return (
        <div className="graph-container">
          <Scatter data={data} options={options} />
        </div>
      )
  };

export default Graph;
