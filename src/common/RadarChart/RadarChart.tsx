import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

import { Radar } from 'react-chartjs-2';
import PokemonDetails from '../../models/PokemonDetails';

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

interface Props{
  pokemon:PokemonDetails,
  colorStyle?:string,
}
  export default function RadarChart({pokemon,colorStyle}:Props) {
  
    const label=[];
    for (const [,value] of Object.entries(pokemon.stats)){label.push(value.name.replace('-',' '))}

    const data_val=[];
    for (const [,value] of Object.entries(pokemon.stats)){data_val.push(value.base)}

  const data = {
    labels: [...label],
    datasets: [
      {
        label: "Umiejętności pokemona",
        data: [...data_val],
        backgroundColor: colorStyle,
        borderColor: colorStyle,
        borderWidth: 1,
      },
    ],
  };
  const option = {
    scales: {
        r: {
            angleLines: {
                display: false
            },
            suggestedMin: 20,
            suggestedMax: 60,
            
            pointLabels: {
              padding: 10,
              font: {
                size: 16,
                fontStyle: "bold",
              },
            },
            ticks: {
              showLabelBackdrop: false,
              maxTicksLimit: 5,
              beginAtZero: true
            }
            

        },
       
    },
    pointRadius: 4,
    label:{
      enabled: false
,
      font: {
        size: 14
      },
    },
    legend: {
      display: false
   },
   tooltips: {
      enabled: false
   },
   plugins: {
    legend: {
      display: false,
    },
  },

    
};
ChartJS.defaults.font.size = 16;
  
    return (

      <div>
      <Radar data={data} options={option} style={{marginTop:'0.5em'}}  width={'20em'} height={'20em'}  />
      </div>
      );
  }
