"use client";

import React from "react";

export const SelectDaysList = [
  {
    id: 1,
    title: '1-3 Days',
    desc: 'Short getaway',
    icon: '🗓️'
  },
  {
    id: 2,
    title: '4-7 Days',
    desc: 'Perfect vacation',
    icon: '🌴'
  },
  {
    id: 3,
    title: '1-2 Weeks',
    desc: 'Extended travel',
    icon: '✈️'
  },
  {
    id: 4,
    title: '2+ Weeks',
    desc: 'Long adventure',
    icon: '🌍'
  }
];

function SelectDaysUi({ onSelectedOption }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
      {SelectDaysList.map((item, index) => (
        <div
          key={index}
          className="p-3 border rounded-2xl bg-white hover:border-primary cursor-pointer text-center"
          onClick={() => onSelectedOption(item.title + ":" + item.desc)}
        >
          <h2 className="text-2xl">{item.icon}</h2>
          <h2 className="font-semibold">{item.title}</h2>
          <p className="text-sm text-gray-500">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default SelectDaysUi;