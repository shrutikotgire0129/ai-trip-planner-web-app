import React from 'react'

export const SelectTravelsList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole travels in exploration',
    icon: '✈️',
    people: '1'
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travels in tandem',
    icon: '🥂',
    people: '2 People'
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun loving adv',
    icon: '🏡',
    people: '3 to 5 People'
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seekes',
    icon: '⛺',
    people: '5 to 10 People'
  }
];

function GroupSizeUi({onSelectedOption}:any) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 items-center mt-1'>
      {SelectTravelsList.map((items,index)=>(
        <div key={index} className='p-3 border rounded-2xl bg-white hover:border-primary cursor-pointer'
        onClick={()=>onSelectedOption(items.title+":"+items.people)}
        >
            <h2>{items.icon}</h2>
            <h2>{items.title}</h2>
        </div>
      ))}
    </div>
  )
}

export default GroupSizeUi