import React from 'react'
import { BsDiscord, BsGithub, BsMailbox } from 'react-icons/bs'

function SocialButtons() {
  return (   
     <div class="flex flex-wrap  gap-4">

<a href="https://discord.com/channels/@me/521609038920941578" target="_blank" rel="noopener noreferrer">
<BsDiscord className='text-[#0dcdbd]'></BsDiscord>
      </a>
      <a href="https://github.com/Hosfad" target="_blank" rel="noopener noreferrer">

      <BsGithub className='text-[#0dcdbd]'></BsGithub>
      </a>
      
  
</div>
  )
}


export default SocialButtons