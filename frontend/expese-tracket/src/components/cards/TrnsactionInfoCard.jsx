import React from 'react'
import { LuUtensils,LuTrendingUp,LuTrendingUpDown,LuTrendingDown,LuTrash2 } from 'react-icons/lu'

function TrnsactionInfoCard({ title, icon, date, amount, type, hideDeleteButton,onDelete }) {
    const getAmoutStyles = () => 
         type === 'income'?
          'bg-green-50 text-green-500'
        :
           'bg-red-50 text-red-600'
        
    
  return (
    <div className='group relative flex items-center gap-5 mt-2 p-3 rounded-lg hover:bg-gray-100/60 '>
          <div className='w-12 h-12 flex items-center justify-center text-gray-800 text-xl bg-gray-100 rounded-full'>
              {icon ?
                  <img src={icon} alt=""  className='h-6 w-6 '/>:<LuUtensils/>
              }
          </div>
          <div className='flex-1 flex items-center justify-between '>
              <div className=''>
                  <p className='text-sm text-gray-700 font-medium'>{title}</p>
                  <p className='text-xs text-gray-400 mt-1'>{date}</p>
              </div>
              <div className='flex items-center gap-2'>
                  {!hideDeleteButton && (
                      <button className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer' onClick={onDelete}><LuTrash2/></button>
                  )}
              </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmoutStyles()} `}>
              <h6 className='text-xs font-medium'>
                  {
                      type === 'income' ? "+" : "-"
                  }
                  {amount}
              </h6>
              {type === 'income' ? <LuTrendingUp/> : <LuTrendingDown/>}
          </div>
    </div>
  )
}

export default TrnsactionInfoCard
