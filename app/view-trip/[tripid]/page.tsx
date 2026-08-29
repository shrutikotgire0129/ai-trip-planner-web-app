"use client";
import { useTripDetail, useUserDetail } from '@/app/provider';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Trip } from '@/app/my-trips/page';
import Itinerary from '@/app/create-new-trip/_components/Itinerary';
import GlobalMap from '@/app/create-new-trip/_components/GlobalMap';

function ViewTrip() {

  const {tripid} = useParams();
  const {userDetail,setUserDetail}=useUserDetail();
  const convex = useConvex();
  // @ts-ignore
  const [tripData, setTripData]=useTripDetail<Trip>();

  useEffect(()=>{
      userDetail&&GetTrip()
  },[userDetail])

  const GetTrip = async () => {
  // if (!userDetail?._id || !tripid) return;

  const result = await convex.query(
    api.tripDetail.GetTripById,
    {
      // uid: userDetail._id,
      tripid: tripid + "",
    }
  );

  console.log(result);
  setTripData(result);
  // setTripDetailInfo(result?.tripDetail);
};

  return (
    <div className='grid grid-cols-5'>
      <div className='col-span-3'>
        <Itinerary />
      </div>
      <div className='col-span-2'>
        <GlobalMap/>
      </div>
    </div>
  )
}

export default ViewTrip