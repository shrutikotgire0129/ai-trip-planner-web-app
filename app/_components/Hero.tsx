"use client";

import { Button } from '@/components/ui/button';
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/nextjs';
import {
  ArrowDown,
  Globe,
  Globe2,
  Landmark,
  Plane,
  Send,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const suggestions = [
  {
    title: 'Create New Trip',
    icon: <Globe2 className='text-blue-400 w-5 h-5' />,
  },
  {
    title: 'Inspire me where to go',
    icon: <Landmark className='text-green-400 w-5 h-5' />,
  },
  {
    title: 'Discover new places',
    icon: <Plane className='text-purple-400 w-5 h-5' />,
  },
  {
    title: 'Adventure Destination',
    icon: <Globe className='text-orange-400 w-5 h-5' />,
  },
];

function Hero() {
  const { user } = useUser();
  const router = useRouter();

  const onSend = () => {
    if (!user) {
      router.push('/sign-in');
      return;
    }

    router.push('/create-new-trip');
  };

  return (
    <div className='mt-24 w-full flex flex-col items-center px-4'>
      <div className='max-w-3xl w-full text-center space-y-6'>
        <h1 className='text-xl md:text-5xl font-bold'>
          Hi, I'm your <span className='text-primary'>AI travel planner!</span>
        </h1>

        <p className='text-lg'>
          Tell me what you want, and I'll handle the rest:
          Flights, Hotels, Trip Planning — all in seconds.
        </p>
      </div>

      <div className='w-full max-w-2xl mt-10 relative'>
        <div className='border rounded-2xl p-4'>
          <Textarea
            placeholder='Describe your ideal trip...'
            className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
          />
        </div>

        <Button
          size='icon'
          className='absolute right-6 bottom-6'
          onClick={onSend}
        >
          <Send className='w-4 h-4' />
        </Button>
      </div>

      <div className='flex flex-wrap justify-center gap-4 mt-6'>
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className='flex items-center gap-2 rounded-full border p-2 px-4 cursor-pointer hover:bg-primary hover:text-white'
          >
            {suggestion.icon}
            <h2 className='text-sm'>{suggestion.title}</h2>
          </div>
        ))}
      </div>

      <div className='flex items-center justify-center flex-col'>
        <h2 className='my-7 mt-14 flex items-center gap-2 text-center'>
          Not sure where to go?
          <strong>See how it works?</strong>
          <ArrowDown className='w-4 h-4' />
        </h2>

        <div className='w-full max-w-4xl flex justify-center'>
          <HeroVideoDialog
            className='block dark:hidden'
            animationStyle='from-center'
            videoSrc='https://www.example.com/dummy-video'
            thumbnailSrc='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJJaBXaxSulrxQUgfT9V5itElrljaIMeARJo-9omG76Q&s=10'
            thumbnailAlt='Dummy Video Thumbnail'
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;