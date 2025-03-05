import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../charts/CustomBarChart";
import moment from "moment";

function IncomeOverview({ transactions, onAddIncome }) {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
      const result = prepareIncomeBarData(transactions);
      setChartData(result);
    return () => {};
  }, [transactions]);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">Track your income over time and analyze your income trends.</p>
        </div>
        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" /> Add Income
        </button>
      </div>
          <div className="mt-10 ">
              <CustomBarChart data={chartData} />
      </div>
    </div>
  );
}
const prepareIncomeBarData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMMM"),
    amount: item?.amount,
    source: item?.source,
  }));
  return chartData;
};
export default IncomeOverview;
