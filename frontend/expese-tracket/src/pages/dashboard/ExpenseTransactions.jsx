import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TrnsactionInfoCard from '../../components/cards/TrnsactionInfoCard'

function ExpenseTransactions({transactions,onSeeMore}) {
  return (
    <div className='card'>
          <div className='flex items-center justify-between'>
              <h5 className=''>Expenses</h5>
              <button className='card-btn cursor-pointer' onClick={onSeeMore}>See All <LuArrowRight className='text-base'/></button>
          </div>
          <div className='mt-6'>
              {
                  transactions?.slice(0, 5)?.map((expense) => (
                      <TrnsactionInfoCard
                          key={expense._id}
                          title={expense.category}
                          icon={expense.icon}
                          date={moment(expense.date).format("DD-MM-YYYY")}
                          amount={expense.amount}
                          type="expense"
                          hideDeleteButton
                      />
                  ))
              }
          </div>
    </div>
  )
}

export default ExpenseTransactions
