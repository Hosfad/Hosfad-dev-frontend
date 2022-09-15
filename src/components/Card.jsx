import React from 'react'
import { BsDiscord } from 'react-icons/bs'
import SocialButtons from './SocialButtons'
import background from "../assets/logoCircle.gif"
import { useEffect } from 'react'
import observerFade from '../hooks/observerFade'

function Card() {
  
  useEffect(()=>{
    const hiddenElemnts = document.querySelectorAll(".hide1")
    hiddenElemnts.forEach(e=>{
       observerFade.observe(e);
    })
 
 
 })
  return (
    
<section class=" container mx-auto p-10 md:p-20 transform duration-500   text-black dark:text-white ">

        <article class="flex flex-wrap  md:flex-nowrap border-4 border-[#0dcdbd] dark:bg-gray-900 rounded-2xl  shadow-lg mx-auto w-fit  ">
            <img class="w-full md:w-40 md:h-40 h-full rounded-2xl " src={background} alt="" />
            <div class="p-6 my-auto hide1">
            <p class="text-[#0dcdbd]  text-center text-2xl">About me</p>

                <h1 class="text-3xl font-semibold ">Firas aka Hosfad</h1>
                <p className='text-[#0dcdbd]'>Programing and automation enthusiast.</p>
                <p class="mt-2">
                    Hello there, My name is Firas I'm a 22 year old computer science student.
                    I've been developing for +6 years now.
                    <br/>
                    I've been specially involved with <a class="text-[#0dcdbd] mt-2">Runescape</a>,     
                    I started off with Private server development then I moved on to OSRS scripting and bot development.
                    <br/>
                    I also did alot of Web development (Frontend/Backend) and recently i have been enjoying Discord bot development alot.
                    <br/>
                    My most notable creations : <a class="text-[#0dcdbd] mt-2">Illusion-scape</a>, <a class="text-[#0dcdbd] mt-2">North-scape</a>, 
                     <a class="text-[#0dcdbd] mt-2"> Zodiac account manager</a> , <a class="text-[#0dcdbd] mt-2">Geilinor bot</a> , <a class="text-[#0dcdbd] mt-2">Hosfad bot</a>
                     <br/>

                    <p className='text-[#0dcdbd] mt-4 text-2xl'>My goals</p>
                    <br/>
                    1- Finish my Computer science degree
                    <br/>
                    2- Finish Masters in Computer science and Cybersecurity 
                    <br/>
                    3- Get a private pilot liecense later down the line
                    <br/>

                    <br/>

                    <SocialButtons></SocialButtons>

                </p>
            </div>
        </article>
      
    </section>

   
    

  )
}

export default Card