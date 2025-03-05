import React, { useEffect, useState } from 'react'
import CustomPieChart from './CustomPieChart';
const COLORS = ["#875CF5","#FA23C7", "#FF6900", "#4f39f6"];

function RecentIncomesWithChart({ data, totalIncome }) {
    const [chartData, setChartData] = useState([]);
    const prepareChartData = () => {
        const dataArr = data.map((item) => ({
            name: item.source,
            amount: item.amount
        }))
        setChartData(dataArr)
    }
    useEffect(() => {
        prepareChartData()
        return () => {
            
        }
    }, [data])
  return (
    <div className="card">
      <div className="items-center justify-between ">
        <h5 className="text-lg">Last 60 Days Incomes</h5>
      </div>
      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
              showTextAnchor
              colors={COLORS}
      />
    </div>
  );
}

export default RecentIncomesWithChart
