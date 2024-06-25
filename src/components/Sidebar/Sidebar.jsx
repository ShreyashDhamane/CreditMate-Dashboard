"use client";

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { BsBagPlusFill } from 'react-icons/bs'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { useRouter, usePathname } from 'next/navigation';

const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const links = {
        "Affiliation": {
            icon: <BsBagPlusFill />,
            links: [
                {
                    "name": "Offers",
                    "link": "/"
                },
            ]
        },
    }
    const pathname = usePathname();

    return (
        <div className={`flex flex-col text-14 m-[.4rem] bg-blue-100 rounded-6 sticky top-4 text-white h-[calc(100vh-.8rem)] transition duration-150 ease-out z-50
        ${!sidebarOpen ? 'w-[4.5rem]' : 'min-w-[22rem] w-[22rem]'}`}>
            <div onClick={() => setSidebarOpen(state => !state)} className={`absolute text-18 right-[-1.5rem]  text-neutral-600 bg-neutral-100 shadow-md grid place-items-center  rounded-50 cursor-pointer ${!sidebarOpen ? 'top-[4.8rem] w-24 h-24' : 'top-[4rem] w-30 h-30'}`}>
                {
                    !sidebarOpen ? <AiOutlineRight /> : <AiOutlineLeft />
                }
            </div>
            {
                !sidebarOpen ? <>
                    <div className='border-b border-b-neutral-500 p-[1.6rem] w-full text-18 font-semibold'>
                        C
                    </div>
                    <div className="flex flex-col gap-22 align-middle max-h-full text-18 pt-26 overflow-auto hide-scrollbar w-full">
                        {Object.entries(links).map(([key, value]) => {
                            return (
                                <div key={key} className="mx-auto">
                                    {value.icon}
                                </div>

                            )
                        })}
                    </div>
                    <div className='cursor-pointer hover:text-blue mt-auto mx-auto py-10'>
                        <BiLogOut className='text-20' />
                    </div>
                </> : <>
                    <div className='border-b border-b-neutral-500 p-[1.6rem] px-[2rem] w-[23rem]'>
                        Credit<span className='text-blue'></span>Mate
                    </div>
                    <div className="flex flex-col max-h-full text-14 pt-16 overflow-auto hide-scrollbar p-[2rem] pr-10">

                        {Object.entries(links).map(([key, value]) => {
                            return (
                                <div key={key}>
                                    <div className='text-neutral-100 font-semibold flex align-middle gap-10'>
                                        <div className='text-[1.5rem]'>
                                            {value.icon}
                                        </div>
                                        {key}
                                    </div>
                                    <div className='py-10'>
                                        {
                                            value.links.map((item, index) => {
                                                return (
                                                    <Link href={item.link} key={index}>
                                                        <div key={index} className={`ml-6 hover:text-white hover:border-l-2 hover:border-l-blue transition-all text-14 cursor-pointer py-6 px-5 border-l  ${pathname === item.link ? 'border-l-2 border-l-blue text-blue font-semibold' : 'text-neutral-300 border-l-neutral-500 font-medium'}`}>{item.name}</div>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                            )
                        })}
                    </div>
                    <div className='flex align-middle gap-8 py-16 px-20 text-16 cursor-pointer hover:text-blue mt-auto'>
                        <BiLogOut className='text-22' />
                        Logout
                    </div>
                </>
            }

        </div>
    )
}

export default Sidebar