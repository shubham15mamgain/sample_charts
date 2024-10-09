/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const getSentimentCounts = (data) => {
  const counts = { positive: 0, negative: 0, neutral: 0 };
  data.forEach((entry) => {
    counts[entry.sentiment] += 1;
  });
  return counts;
};

const DonutChart = ({ filteredData }) => {
  const counts = getSentimentCounts(filteredData);
  const chartData = [
    {
      name: "Positive",
      // value:
      //   (
      //     counts.positive /
      //     (counts.positive + counts.negative + counts.neutral)
      //   ).toFixed(2) * 100,
      value: counts.positive,
      color: "#00ff00",
    },
    {
      name: "Negative",
      // value:
      //   (
      //     counts.negative /
      //     (counts.positive + counts.negative + counts.neutral)
      //   ).toFixed(2) * 100,
      value: counts.negative,
      color: "#ff0000",
    },
    {
      name: "Neutral",
      // value:
      //   (
      //     counts.neutral /
      //     (counts.positive + counts.negative + counts.neutral)
      //   ).toFixed(2) * 100,
      value: counts.neutral,
      color: "#808080",
    },
  ];

  return (
    <div>
      {filteredData.length === 0 ? (
        <h1 className="text-sm"> No data found</h1>
      ) : (
        <PieChart width={400} height={400}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={5}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
};

export default DonutChart;
