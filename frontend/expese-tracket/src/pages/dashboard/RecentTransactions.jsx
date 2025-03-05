import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TrnsactionInfoCard from '../../components/cards/TrnsactionInfoCard'

function RecentTransactions({transactions,onSeeMore}) {
  return (
    <div className="card ">
      <div className="flex items-center justify-between ">
        <h5 className="text-lg">Recent Transactions</h5>
        <button className="card-btn cursor-pointer" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-6">
        {transactions?.slice(0.5).map((transaction) => (
          <TrnsactionInfoCard
            key={transaction._id}
            title={
              transaction.type === "expense"
                ? transaction.category
                : transaction.source
            }
            icon={transaction.icon}
            date={moment(transaction.date).format("DD-MM-YYYY")}
            amount={transaction.amount}
            type={transaction.type}
            hideDeleteButton
          />
        ))}
      </div>
    </div>
  );
}

export default RecentTransactions
