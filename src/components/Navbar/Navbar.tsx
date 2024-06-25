"use client";

import React, { useEffect, useState } from 'react'
import { IoMdPerson } from 'react-icons/io'
import profilePic from '@/assets/images/profilePic.png'
import { FiPlus } from 'react-icons/fi'
import './Navbar.scss';
import Image from 'next/image';

const Navbar = () => {
    const [scrolledDown, setScrolledDown] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        window.addEventListener("scroll", handleNavScroll)
        return () => window.removeEventListener("scroll", handleNavScroll)
    }, [lastScrollY])

    const handleNavScroll = () => {
        if (typeof window !== "undefined") {
            const currentScrollPos = window.pageYOffset
            if (currentScrollPos > lastScrollY && currentScrollPos > 80) {
                // if scroll down hide the navbar
                setScrolledDown(true)
            } else {
                // if scroll up show the navbar
                setScrolledDown(false)
            }
            setLastScrollY(currentScrollPos)
        }
    }

    return (
        <div className={`Navbar ${scrolledDown ? 'scrolled' : ''}`}>
            <div className="nav_left">
                <div className="btn_primary">
                    <FiPlus />
                    Add New Company
                </div>
            </div>
            <div className="nav_right">
                <div className="search">
                    <input type="text" placeholder='Search Here...' />
                </div>
                <div className="profile">
                    <Image height={20} width={40} src={profilePic} alt="profilePic" />
                </div>
            </div>
        </div>
    )
}

export default Navbar