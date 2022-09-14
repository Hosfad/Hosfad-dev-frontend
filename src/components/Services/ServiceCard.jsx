import React from 'react'

function ServiceCard(image ,text) {
  return (
<span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300">
 <div className='mr-1 w-3 h-3'>
    {image}
 </div>
 {text}
</span>
  )
}

export default ServiceCard