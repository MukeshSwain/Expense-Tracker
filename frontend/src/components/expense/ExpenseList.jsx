import React from 'react'
import { LuDownload } from 'react-icons/lu';
import TrnsactionInfoCard from '../cards/TrnsactionInfoCard';
import moment from 'moment';

function ExpenseList({transactions,onDelete,onDownload}) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">All Expenses</h5>
        <button className="card-btn cursor-pointer" onClick={onDownload}>
          <LuDownload className="text-base" />
          Download
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {transactions?.map((expense) => (
          <TrnsactionInfoCard
            key={expense._id}
            title={expense.category}
            amount={expense.amount}
            date={moment(expense.date).format("DD-MM-YYYY")}
            icon={expense.icon}
            type="expense"
            onDelete={() => onDelete(expense._id)}
            hideDeleteButton={false}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpenseList
