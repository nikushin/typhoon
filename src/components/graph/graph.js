import React from 'react';
import { Scatter } from 'react-chartjs-2';
import './graph.css'

const Graph = () => {

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
        label: 'My First dataset',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [{
          x: 10,
          y: 50
        }, {
          x: 20,
          y: 75
        }, {
          x: 30,
          y: 25
        }, {
          x: 40,
          y: 30
        }, {
          x: 400,
          y: 100
        }, {
          x: 500,
          y: 200
        }, {
          x: 700,
          y: 150
        }]
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
          labelString: 'X axe name',
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
          labelString: 'Y axe name',
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
    }
  };

      return (
        <div className="graph-container">
          <Scatter data={data} options={options}/>
        </div>
      )
  };

export default Graph;
