import React from 'react'
import { LuDownload } from 'react-icons/lu';
import TrnsactionInfoCard from '../cards/TrnsactionInfoCard';
import moment from 'moment';

function IncomeList({ transactions, onDelete, onDownload }) {
    return <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Income Sources</h5>
            <button className='card-btn cursor-pointer' onClick={onDownload}><LuDownload className='text-base'/>Download</button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 '>
            {
                transactions?.map((income) => (
                    <TrnsactionInfoCard
                        key={income._id}
                        title={income.source}
                        amount={income.amount}
                        date={moment(income.date).format("DD-MM-YYYY")}
                        icon={income.icon}
                        type="income"
                        onDelete={()=>onDelete(income._id)}
                        hideDeleteButton={false}
                    />
                ))
            }
        </div>
  </div>;
}

export default IncomeList
