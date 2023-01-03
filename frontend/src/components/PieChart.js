import React from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function PieChart({ data }) {
  const pieData = {
    labels: data.map(({ title }) => title),
    datasets: [
      {
        data: data.map((data) => data.value),
        label: "Infected",
        backgroundColor: [
          "#007D9C",
          "#244D70",
          "#D123B3",
          "#F7E018",
          "#fff",
          "#FE452A",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  return (
    <div style={{ width: 650, textAlign: "center" }}>
      <Pie data={pieData} width={50} height={50} />
    </div>
  );
}
