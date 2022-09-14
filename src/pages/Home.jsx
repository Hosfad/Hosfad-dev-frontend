import React from 'react'
import { FaBars } from 'react-icons/fa'
import Card from '../components/Card'
import ServicesCard from '../components/Services/ServicesContainer'




function Home() {
   
      
  return (
    <>

    <div className='content-container  overflow-hidden z-8'>
    <div className='sm:hidden w-screen overflow-hidden h-fit bg-white dark:bg-gray-900 z-8'>
         <h1 className='text-[#0dcdbd] z-8 text-3xl overflow-hidden text-center z-8'>Hosfad</h1>
    </div>
      <div className="h-screen grid grid-cols-1 overflow-y-auto">
      <Card></Card>

      <ServicesCard></ServicesCard>
      </div>
  
    </div>

    </>
  )
}

export default Home