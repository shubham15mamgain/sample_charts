import { useState } from "react";
import DonutChart from "./DonutChart";
import moment from "moment";
import sentimentData2 from "../../data2";

const DonutGraph = () => {
  const [dateRange, setDateRange] = useState("last7Days");
  const [customRange, setCustomRange] = useState({ start: "", end: "" });

  const filterData = () => {
    const today = new Date();
    let filteredData = sentimentData2;

    if (dateRange === "last7Days") {
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      filteredData = sentimentData2.filter(
        (entry) =>
          new Date(moment(entry.time).format("YYYY-MM-DD")) >= sevenDaysAgo
      );
    } else if (dateRange === "last30Days") {
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);
      filteredData = sentimentData2.filter(
        (entry) =>
          new Date(moment(entry.time).format("YYYY-MM-DD")) >= thirtyDaysAgo
      );
    } else if (dateRange === "custom" && customRange.start && customRange.end) {
      filteredData = sentimentData2.filter((entry) => {
        const entryDate = new Date(moment(entry.time).format("YYYY-MM-DD"));
        return (
          entryDate >=
            new Date(moment(customRange.start).format("YYYY-MM-DD")) &&
          entryDate <= new Date(moment(customRange.end).format("YYYY-MM-DD"))
        );
      });
    }

    return filteredData;
  };

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  const handleCustomRangeChange = (event) => {
    const { name, value } = event.target;
    setCustomRange((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = filterData();

  return (
    <div>
      <h1>Sentiment Analysis Chart</h1>
      <select onChange={handleDateRangeChange}>
        <option value="last7Days">Last 7 Days</option>
        <option value="last30Days">Last 30 Days</option>
        <option value="custom">Custom Date Range</option>
      </select>

      {dateRange === "custom" && (
        <div>
          <input
            type="date"
            name="start"
            value={moment(customRange.start).format("YYYY-MM-DD")}
            onChange={handleCustomRangeChange}
          />
          <input
            type="date"
            name="end"
            value={moment(customRange.end).format("YYYY-MM-DD")}
            onChange={handleCustomRangeChange}
          />
        </div>
      )}

      <DonutChart filteredData={filteredData} />
    </div>
  );
};

export default DonutGraph;
