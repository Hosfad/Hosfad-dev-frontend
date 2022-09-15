import React from 'react'
import { useEffect } from 'react';
import observer from '../hooks/observerLeftSlide';
import background from "../assets/logoCircle.gif"
import reviewsImg from "../assets/review.png"
import sellers from "../assets/sellers.png"
import player from "../assets/player.png"
import killcount from "../assets/killcount.png"
import news from "../assets/news.png"
import wiki from "../assets/wiki.png"
import duel from "../assets/duel.png"
import darts from "../assets/darts.png"
import profile from "../assets/profile.png"

function DiscordBots() {
  useEffect(()=>{
    const hiddenElemnts = document.querySelectorAll(".hide")
    hiddenElemnts.forEach(e=>{
      observer.observe(e);
    })
 })
 const openInNewTab = url => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
  return (
    <div className='dark:bg-gray-800 w-full h-screen overflow-y-auto'>
        <div className='container w-[85%] md:mr-16 mt-12 h-fit mx-auto my-auto border-4 border-[#0dcdbd] text-center dark:text-white dark:bg-gray-900 rounded-2xl mb-8 shadow-lg'>
        <p class="text-[#0dcdbd] mt-2 text-center text-2xl">Discord bots</p>
        <br></br>
        <Divider></Divider>

        <p class="text-[#0dcdbd] mt-2 text-center text-xl">Geilinor bot</p>
        <div class="hide">
        Geilinor bot is an Oldschool runescape utility discord bot, It allows users easily search the player Highscores, Items database , and much more.
            <br></br>
            It also comes with a built in feedback system, So that sellers can recieve reviews from their customers
            <p class="text-[#0dcdbd] mt-2 text-center ">Features</p>
            <div className=' mx-auto text-justify w-fit'>
             - Oldschool runescape wiki search.
            <br></br>
             - Oldschool runescape news and updates. 
            <br></br>
             - Oldschool runescape player highscore search.
            <br></br>
             - Oldschool runescape item database search.    
            <br></br>
             - Discord feedback system with start rating. 
            <br></br>
             - PvP duel arena , Multiplayer darts, Guess the number.

            </div>
            <button className='bg-[#0dcdbd] text-black w-40 rounded-2xl mt-6' onClick={()=>{
              openInNewTab("https://discord.com/api/oauth2/authorize?client_id=971012142922862623&permissions=76808&scope=bot")
            }}>Invite gielinor bot</button>

            <div className='grid grid-cols-1 gap-6 mt-8 md:grid-cols-3'>
            <img class=" w-fit h-fit rounded-2xl " src={player} alt="" />
            <img class=" w-fit h-fit rounded-2xl " src={killcount} alt="" />
            <img class=" w-fit h-fit rounded-2xl " src={news} alt="" />

            <img class=" w-fit h-fit rounded-2xl " src={sellers} alt="" />
            <img class=" w-fit h-fit rounded-2xl " src={reviewsImg} alt="" />
            <img class=" w-fit h-fit rounded-2xl " src={profile} alt="" />

            <img class=" w-fit h-fit rounded-2xl " src={duel} alt="" />
            <img class=" w-fit h-fit rounded-2xl " src={darts} alt="" />
            <img class=" w-fit h-fit rounded-2xl " src={wiki} alt="" />


              </div>
        </div>



            <br></br>
        </div>
        <br></br>

    </div>
  )
  
}
const Divider = () => <hr className="sidebar-hr mx-auto w-[60%]" />;

export default DiscordBots