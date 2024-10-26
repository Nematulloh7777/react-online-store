import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink  } from 'react-router-dom';
import './../styles/header.css';
import axios from 'axios';
import Theme from './UI/Theme/Theme';
import { useSelector } from 'react-redux';

const Header = ({drawerOpen}) => {
    const [city, setCity] = useState("Город...")
    const [isSticky, setIsSticky] = useState(false);
    const navigate = useNavigate()
    const {items, totalPrice} = useSelector(state => state.cart)

    const fetchLocation = async () => {
        try {
            const response = await axios.get('https://ipapi.co/json/');
            setCity(response.data.city)
        } catch (error) {
            console.error('Ошибка при получении местоположения или переводе:', error)
        }
    }

    useEffect(() => {
        // fetchLocation()

        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []) 

    return (
        <header className={`flex justify-between rounded-t-[25px] border-b shadow-md border-slate-300 px-10 py-8 dark:bg-[#0f172a] ${isSticky ? 'fixed top-0 left-0 right-0 z-10 backdrop-blur-2xl bg-white/50 dark:bg-[#0f172a]/80 dark:backdrop-blur-2xl w-[85%] m-auto rounded-b-[25px] shadow-lg' : ''} `}>
            <div  onClick={() => navigate('/')} className='flex items-center gap-4 cursor-pointer hover:text-slate-500 hover:scale-95 transition-all duration-200 '>
                <img src="/img/logo.png" alt="logo" className='w-10' />
                <div>
                    <h1 className='text-xl font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#0093E9] to-[#2cc4b2] dark:text-white'>React | Online Store</h1>
                    <p className='text-slate-400'>Магазин лучших товаров</p>
                </div>
            </div>

            <div className="flex flex-1"></div>

            <ul className='flex items-center gap-6'>
                <li className='grid justify-items-center cursor-pointer gap-1 text-slate-500 hover:text-black transition-all duration-200 dark:text-slate-300  dark:hover:text-slate-400' >
                    <img src="/img/location.svg" alt="location" className='icon'/>
                    <span>Москва</span>
                </li>
                <li onClick={drawerOpen} className='relative grid justify-items-center cursor-pointer gap-1 text-slate-500 hover:text-black transition-all duration-200 dark:text-slate-300  dark:hover:text-slate-400'>
                    <img src="/img/cart.svg" alt="cart" className='icon' />
                    <b>{totalPrice} руб.</b>
                    {items.length > 0 &&
                        <span className="absolute -top-3 right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {items.length}
                        </span>
                    }
                </li>
                <NavLink
                    to="/favorites"
                    className={({ isActive, isPending }) =>
                        isPending ? "" : isActive ? "text-black font-medium" : "text-slate-500  hover:text-black"
                    }
                    >
                        <li
                            className={`grid justify-items-center cursor-pointer gap-1 transition-all duration-200 dark:text-slate-300 dark:hover:text-slate-400`}
                        >
                            <img src="/img/heart.svg" alt="favourite" className='icon' />
                            <span>Закладки</span>
                        </li>
                </NavLink>
                <li className='grid justify-items-center cursor-pointer gap-1 text-slate-500 hover:text-black transition-all duration-200 dark:text-slate-300  dark:hover:text-slate-400'>
                    <img src="/img/profile.svg" alt="profile" className='icon' />
                    <span>Профиль</span>
                </li>
                <Theme />
            </ul>
        </header>
    );
};

export default Header;