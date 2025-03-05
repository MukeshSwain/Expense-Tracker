import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TrnsactionInfoCard from '../../components/cards/TrnsactionInfoCard'
import moment from 'moment'

function RecentIncomes({transactions,onSeeMore}) {
  return (
    <div className='card'>
          <div className='flex items-center justify-between'>
              <h5 className='text-lg'>Income</h5>
              <button onClick={onSeeMore} className='card-btn cursor-pointer'>See All <LuArrowRight className='text-base'/></button>
          </div>
          <div className='mt-6'>
              {
                  transactions?.slice(0, 5)?.map((item, index) => (
                      <TrnsactionInfoCard
                          key={item._id}
                          title={item.source}
                          amount={item.amount}
                          date={moment(item.date).format("DD-MM-YYYY")}
                          
                          icon={item.icon}
                          type="income"
                          hideDeleteButton
                      />
                  ))
              }
          </div>
    </div>
  )
}

export default RecentIncomes
