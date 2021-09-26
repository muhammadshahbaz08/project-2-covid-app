import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

export const Chart = ({ data, country, countryData }) => {
  
  // Line Chart
  const LineChart = data.length ? (
    <Line
      data={{
        labels: data.map(({ date }) => date),
        datasets: [
          {
            data: data.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: data.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  //Bar Chart 
  const BarChart = countryData.confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [{
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
             data: [
              countryData.confirmed.value,
              countryData.recovered.value,
              countryData.deaths.value,
            ],
          },
        ],
      }}
      // Option not working
      option={{
        legend: { display: false },
        title: { display: true, text: `Current State in ${country}` },
      }}
      
    />
  ) : null;
  return (
    <div className={styles.container}>
      {country === "global" ? LineChart : BarChart}
    </div>
  );
};
