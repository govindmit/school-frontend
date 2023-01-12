import dynamic from "next/dynamic";
import React from "react";
import ReactApexChart, { Props } from "react-apexcharts";

const TasksChart: React.FC<Props> = () => {
  const options = {
    chart: {
      height: 350,
      zoom: {
        enabled: true,
      },
    },
  };

  const series = [
    {
      name: "All Tasks",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "My Tasks",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];

  return (
    <>
      <ReactApexChart
        type="line"
        options={options}
        series={series}
        height={305}
      />
    </>
  );
};

export default TasksChart;
