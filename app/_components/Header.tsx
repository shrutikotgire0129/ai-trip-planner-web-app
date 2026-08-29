"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { SignIn, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

const menuOptions=[
  {
    name:'Home',
    path:'/'
  },
  {
    name:'Pricing',
    path:'/pricing'
  },
  {
    name:'Contact Us',
    path:'/contact-us'
  }
]

function Header() {

  const { user } = useUser();
  const path=usePathname();
  console.log(path);



  return (
    <div className='flex justify-between items-center p-4'>
      {/* {Logo} */}
      <div className='flex gap-2 items-center'>
          <Image src={'./logo.svg'} alt='logo' width={30} height={30}/>
          <h2 className='font-bold text-2xl'>AI Trip Planner</h2>
      </div>

      {/* {Menu Options} */}
      <div className='flex gap-8 items-center'>
        {menuOptions.map((menu,index)=>(
          <Link key={menu.path} href={menu.path}>
              <h2 className='text-lg hover:scale-105 transition-all hover:text-primary'>{menu.name}</h2>
          </Link>
        ))}
      </div>

      {/* {Get Started Button} */}
      <div className='flex gap-5 items-center'>
        {!user? (<SignInButton mode='modal'>
          <Button>Get Started</Button>
        </SignInButton>):
              path=='/create-new-trip'?
              <Link href={'/my-trips'}>
                <Button> My Trips </Button>
              </Link>
              :<Link href={'/create-new-trip'}>
                <Button> Create New Trip </Button>
              </Link>
        }
      <UserButton/>
      </div>
    </div>
  )
}

export default Header
