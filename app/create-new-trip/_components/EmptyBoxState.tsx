import React from 'react'
import { suggestions } from '@/app/_components/Hero'

function EmptyBoxState({ onSelectOption }:any) {
  return (
    <div className='mt-7'>
      <h2 className='font-bold text-3xl text-center'>Start Planning new <strong className='text-primary'>Trip</strong> using AI</h2>
      <p className='text-center text-gray-400 mt-2'>Dicover personalized travel inineries travel, find best destinations, and plan your dream vacation effortlessly with power of AI. Let our smart assitant to the hard work while you enjoy the journey.</p>

      <div className='flex flex-col gap-3 mt-5'>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={()=>onSelectOption(suggestion.title)}
                  className='flex items-center gap-2 rounded-lg border p-3 py-2 cursor-pointer hover:border-primary hover:text-primary'
                >
                  {suggestion.icon}
                  <h2 className='text-base'>{suggestion.title}</h2>
                </div>
              ))}
            </div>

    </div>
  )
}

export default EmptyBoxState