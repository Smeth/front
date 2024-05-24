"use client"

import { Chart } from "react-google-charts";

export const data = [
  ["Mois", "Plan Basique", "Plan Prémium", "Plan Platinum", "Plan Diamond"],
  ["Jan", 1000, 400, 200, 300],
  ["Fev", 1170, 460, 250, 350],
  ["Mar", 660, 1120, 300, 400],
  ["Avr", 1030, 540, 350, 500],
  ["Mai", 1030, 540, 350, 500],
  ["Juin", 1030, 540, 350, 500],
  ["Jul", 1030, 540, 350, 500],
  ["Aout", 1030, 540, 350, 500],
  ["Sept", 1030, 540, 350, 500],
  ["Oct", 1030, 540, 350, 500],
  ["Nov", 0, 0, 0, 0],
  ["Dec", 0, 0, 0, 0],
];

export const options = {
  chart: {
    title: "Statistiques du plan des utilisateurs",
    subtitle: "Année 2023",
    backgroundColor: {
        fill: 'black',
        strokeWidth: 0,
    },
  },
};


const StatsBarCart = () => {
    return (
        <Chart
          mapsApiKey=""
          chartType="Bar"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
    )
}

export default StatsBarCart