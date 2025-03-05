import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'
import SideMenu from './SideMenu'

function DashboardLayout({activeMenu, children}) {
    const { user } = useSelector((store) => store.auth)
    
  return (
    <div className=''>
          <Navbar activeMenu={activeMenu} />
          {
              user && (
                  <div className='flex'>
                      <div className='mx-[1080px]:hidden'>
                          <SideMenu activeMenu={activeMenu} />
                      </div>
                      <div className='grow mx-5'>
                          {children}
                      </div>
                  </div>
              )
          }
    </div>
  )
}

export default DashboardLayout
