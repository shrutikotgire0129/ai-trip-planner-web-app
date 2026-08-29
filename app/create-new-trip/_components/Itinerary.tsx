"use client"
import React, { useState, useEffect } from 'react'
import { Timeline } from "@/components/ui/timeline";
import Image from 'next/image';
import { ArrowLeft, Clock, ExternalLink, Star, Ticket, WalletIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link'
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/provider'
import { TripInfo } from './ChatBox';


// const TRIP_DATA = {
//   destination: "Goa, India",
//   duration: "2 Days",
//   origin: "Mumbai, India",
//   budget: "Low",
//   group_size: "Solo",
//   hotels: [
//     {
//       hotel_name: "The Bucket List, Goa",
//       hotel_address: "House No.234/1 Doranto, Goa",
//       price_per_night: "INR 500-800",
//       hotel_image_url: "https://images.unsplash.com/photo-1582719508461-905c673771fd",
//       geo_coordinates: {
//         latitude: 15.5989,
//         longitude: 73.7493
//       },
//       rating: 4.5,
//       description: "A popular and budget-friendly hostel with vibrant atmosphere and great community vibes."
//     },
//     {
//       hotel_name: "Zostel Goa",
//       hotel_address: "Anjuna Beach Road, Goa",
//       price_per_night: "INR 700-1200",
//       hotel_image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
//       geo_coordinates: {
//         latitude: 15.5745,
//         longitude: 73.7400
//       },
//       rating: 4.6,
//       description: "Trendy backpacker hostel near Anjuna beach with modern amenities and social events."
//     }
//   ],
//   itinerary: [
//     {
//       day: 1,
//       day_plan: "Explore North Goa beaches and nightlife",
//       best_time_to_visit_day: "Morning to Late Night",
//       activities: [
//         {
//           place_name: "Baga Beach",
//           place_details: "One of the most famous beaches known for water sports and nightlife.",
//           place_image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
//           geo_coordinates: {
//             latitude: 15.5553,
//             longitude: 73.7517
//           },
//           place_address: "Baga, Goa",
//           ticket_pricing: "Free (Water sports extra)",
//           time_travel_each_location: "30 mins from hotel",
//           best_time_to_visit: "Morning or Sunset"
//         },
//         {
//           place_name: "Calangute Beach",
//           place_details: "Largest beach in North Goa, great for relaxing and shopping.",
//           place_image_url: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d",
//           geo_coordinates: {
//             latitude: 15.5439,
//             longitude: 73.7553
//           },
//           place_address: "Calangute, Goa",
//           ticket_pricing: "Free",
//           time_travel_each_location: "10 mins from Baga",
//           best_time_to_visit: "Afternoon"
//         },
//         {
//           place_name: "Tito's Lane",
//           place_details: "Famous nightlife street with clubs, bars, and music.",
//           place_image_url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
//           geo_coordinates: {
//             latitude: 15.5550,
//             longitude: 73.7510
//           },
//           place_address: "Baga, Goa",
//           ticket_pricing: "INR 1000-2000 (club entry)",
//           time_travel_each_location: "5 mins from Baga Beach",
//           best_time_to_visit: "Night"
//         }
//       ]
//     },
//     {
//       day: 2,
//       day_plan: "Visit forts and relax at peaceful beaches",
//       best_time_to_visit_day: "Morning to Evening",
//       activities: [
//         {
//           place_name: "Fort Aguada",
//           place_details: "Historic Portuguese fort with stunning sea views.",
//           place_image_url: "https://images.unsplash.com/photo-1599661046289-e31897846e41",
//           geo_coordinates: {
//             latitude: 15.4936,
//             longitude: 73.7732
//           },
//           place_address: "Sinquerim, Goa",
//           ticket_pricing: "INR 50",
//           time_travel_each_location: "40 mins from Baga",
//           best_time_to_visit: "Morning"
//         },
//         {
//           place_name: "Candolim Beach",
//           place_details: "Less crowded beach ideal for relaxing and peaceful time.",
//           place_image_url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
//           geo_coordinates: {
//             latitude: 15.5180,
//             longitude: 73.7625
//           },
//           place_address: "Candolim, Goa",
//           ticket_pricing: "Free",
//           time_travel_each_location: "15 mins from Fort Aguada",
//           best_time_to_visit: "Evening"
//         }
//       ]
//     }
//   ]
// };

function Itinerary() {
  const {tripDetailInfo, setTripDetailInfo} = useTripDetail();
  const [tripData,setTripData]=useState<TripInfo|null>(null);

  useEffect(() => {
    tripDetailInfo&&setTripData(tripDetailInfo)
    
  }, [tripDetailInfo])
  
  const data = tripData?[
    {
      title: "Hotels",
      content: (
        <div className='grid gird-cols-1 md:grid-cols-2 gap-4'>
          {tripDetailInfo?.hotels.map((hotel, index) => (
            <HotelCardItem hotel={hotel}/>
          ))}
        </div>
      )
    },
    // @ts-ignore
  ...tripData?.itinerary.map((dayData) => ({
    title: `Day ${dayData?.day}`,
    content: (
      <div>
        <p className='mb-2 font-bold text-xl text-primary'>Best Time: {dayData?.best_time_to_visit_day}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* @ts-ignore */}
          {dayData?.activities?.map((activity, index) => (
            <PlaceCardItem activity={activity}/>
          ))}
        </div>
      </div>
    ),
  })),
]:[];
  return (
    <div className="relative w-full h-[85vh] overflow-auto">
      {/* @ts-ignore */}
      {tripData ? <Timeline data={data} tripData={tripData} />
      :
      <div>
      <h2 className='flex gap-2 text-4xl text-gray-900 items-center absolute bottom-30 left-20'><ArrowLeft/>Getting to know you to build perfect Trip here...</h2>
      <Image src={'/Travel.jpg'} alt='travel' width={'500'} height={'800'}
      className='w-full h-full object-cover rounded-3xl'
      />
      </div>
      }
    </div>
  )
}

export default Itinerary