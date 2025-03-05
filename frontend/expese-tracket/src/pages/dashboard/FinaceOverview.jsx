import React from 'react'
import CustomPieChart from '../../components/charts/CustomPieChart'

const COLORS = ["#875CF5", "#FF6900", "#FA2C37"];

function FinaceOverview({ totalIncome, totalExpense, totalBalance }) {
    const balanceData = [
        {name:"Total Balance",amount:totalBalance},
        {name:"Total Income",amount:totalIncome},
        {name:"Total Expense",amount:totalExpense},
    ]
  return (
    <div className='card'>
          <div className='flex items-center justify-between'>
              <h5 className='text-lg'>Financial Overview</h5>
          </div>
          <CustomPieChart
              data={balanceData}
              label = 'Total Balance'
              colors={COLORS}
              totalAmount={`$${totalBalance}`}
              showTextAnchor
          />
    </div>
  )
}

export default FinaceOverview
