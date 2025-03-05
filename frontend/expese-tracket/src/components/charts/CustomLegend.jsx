import React from 'react'

function CustomLegend({ payload }) {
  return (
    <div className='flex flex-wrap justify-center gap-2 mt-4 space-x-6'>
          {
              payload.map((entry, index) => (
                  <div key={`legend-${index}`} className='flex gap-1 items-center justify-center '>
                      <div className='w-3 h-3 rounded-full' style={{ backgroundColor: entry.color }}></div>
                      <span className='text-xs text-gray-700 font-medium'>{entry.value}</span>
                  </div>
              ))
      }
    </div>
  )
}

export default CustomLegend
