"use client";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({
  labels,
  data, // array of number
  backgroundColor,
  renderText,
  className,
  width = "80%",
}) => {
  const chartData = {
    labels: labels || [],
    datasets: [
      {
        data: data || [],
        backgroundColor: backgroundColor || [],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: width,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className={`relative ${className}`}>
      <Doughnut data={chartData} options={options} />
      <div className="absolute top-2/4 left-2/4 -translate-2/4">
        {renderText}
      </div>
    </div>
  );
};

export default DonutChart;
