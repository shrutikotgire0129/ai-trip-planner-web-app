"use client"
import React from 'react'
import Image from 'next/image';
import { ArrowBigRightIcon, Link } from 'lucide-react';
import { Trip } from '../page';
import { useEffect, useState } from 'react';
import axios from "axios";

type Props={
  trip:Trip
}

function MyTripCardItem({trip}:Props) {
  const [photoUrl,setPhotoUrl]=useState<string>();
  useEffect(()=>{
    trip&&GetGooglePlaceDetail();
  },[trip])
  const GetGooglePlaceDetail=async()=>{
    const result=await axios.post('/api/google-place-detail',{
      placeName:trip?.tripDetail?.destination
    });
    if(result?.data?.e){
      return;
    }
    setPhotoUrl(result?.data);
  }
  return (
    <Link href={'/view-trip/'+trip?.tripId} className='p-5 shadow rounded-2xl'>
                <Image src={photoUrl?photoUrl: '/placeholder.jpg'} alt={trip.tripId} width={400} height={400} className='rounded-2xl object-cover w-full h-70' />
                <h2 className='flex gap-2 font-semibold text-xl mt-2'>{trip?.tripDetail?.destination}<ArrowBigRightIcon/> {trip?.tripDetail?.destination}</h2>
                <h2 className='mt-2 text-gray-500'>{trip?.tripDetail?.duration} Trip with {trip?.tripDetail?.budget} Budget</h2>
              </Link>
  )
}

export default MyTripCardItem