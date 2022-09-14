import React from 'react'
import { BsDiscord } from 'react-icons/bs'
import { CgWebsite } from 'react-icons/cg'
import { DiJava } from 'react-icons/di'
import { FaAccusoft, FaJava, FaRobot, FaServer } from 'react-icons/fa'
import { SiWeb3Dotjs } from 'react-icons/si'

function ServicesContainer() {
  return (
    <div className='container w-[76%] h-fit mx-auto my-auto border-4 border-[#0dcdbd]  dark:bg-gray-900 rounded-2xl mb-8 shadow-lg'>
        <p class="text-[#0dcdbd] mt-2 text-center text-2xl">My services</p>
        <div className='grid grid-cols-1 md:grid-cols-3'>
        <span class="bg-gray-100 text-black mt-6 inline-flex items-center px-4 gap-x-4 py-0.5 rounded  dark:bg-gray-900 dark:text-white w-fit mx-auto border-2 border-[#0dcdbd]">
           <CgWebsite></CgWebsite>
              Website development
        </span>
        <span class="bg-gray-100 text-black mt-6 inline-flex items-center px-4 gap-x-4 py-0.5 rounded  dark:bg-gray-900 dark:text-white w-fit mx-auto border-2 border-[#0dcdbd]">
             <FaServer></FaServer>
              Backend development
        </span>
        <span class="bg-gray-100 text-black mt-6 inline-flex items-center px-4 gap-x-4 py-0.5 rounded  dark:bg-gray-900 dark:text-white w-fit mx-auto border-2 border-[#0dcdbd]">
           <FaJava></FaJava>
              Java applications
        </span>
        <span class="bg-gray-100 text-black mt-6 inline-flex items-center px-4 gap-x-4 py-0.5 rounded  dark:bg-gray-900 dark:text-white w-fit mx-auto border-2 border-[#0dcdbd]">
           <FaRobot></FaRobot>
              OSRS bot development
        </span>
        <span class="bg-gray-100 text-black mt-6 inline-flex items-center px-4 gap-x-4 py-0.5 rounded  dark:bg-gray-900 dark:text-white w-fit mx-auto border-2 border-[#0dcdbd]">
           <BsDiscord></BsDiscord>
              Discord bot development
        </span>
        <span class="bg-gray-100 text-black mt-6 inline-flex items-center px-4 gap-x-4 py-0.5 rounded  dark:bg-gray-900 dark:text-white w-fit mx-auto border-2 border-[#0dcdbd] ">
           <SiWeb3Dotjs></SiWeb3Dotjs>
              Web3j applications
        </span>
        </div>
        <br></br>
    </div>
    
  )
}

export default ServicesContainer