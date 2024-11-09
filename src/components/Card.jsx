import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Card = ({ id, imageUrl, title, price, text, isFavorite, onToggleFavorite }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAdded = useSelector(state => state.cart.items.some(item => item.id === id));

    const onClickAdd = () => {
        const item = {
            id,
            title,
            price,
            imageUrl,
        }
        if (isAdded) {
            dispatch(removeProduct(item));
        } else {
            dispatch(addProduct(item));
        }
    }

    const highlightText = (text, query) => {
        if (!query) return text;
        const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${safeQuery})`, 'gi');
        return text.replace(regex, '<span class="bg-yellow-200">$1</span>');
    };

    const createSafeHTML = (htmlString) => {
        return { __html: DOMPurify.sanitize(htmlString) };
    };

    return (
        <div 
            className='dark:bg-gray-300 relative bg-white cursor-pointer border rounded-3xl shadow-sm p-8 border-slate-200 transition hover:-translate-y-2 hover:shadow-xl'
        >
            <img 
                src={isFavorite ? '/img/like-2.svg' : '/img/like-1.svg'} 
                alt="favorite"
                onClick={onToggleFavorite}
                className='absolute top-8 left-8 z-[5] hover:opacity-80 hover:scale-110 transition transform duration-200 ease-in-out cursor-pointer'
            />

            <div className='flex items-center justify-center'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => navigate(`/details-product/${id}`)}
            >
                <img width='180' className='mix-blend-multiply' src={imageUrl} alt="все товары" />
            </div>

            <p 
                className={isHovered ? 'text-[#0093E9] transition-all' : 'hover:text-[#0093E9]'}
            >
                {text
                    ? <span dangerouslySetInnerHTML={createSafeHTML(highlightText(title, text))} />
                    : <span onClick={() => navigate(`/details-product/${id}`)}> {title} </span>
                } 
            </p>

            <div className='flex justify-between mt-5'>
                <div className='flex flex-col'>
                    <span className='text-slate-400'>ЦЕНА:</span>
                    <b>{price} руб.</b>
                </div>

                <img 
                    onClick={onClickAdd} 
                    src={isAdded ? '/img/checked.svg' : '/img/plus.svg'} 
                    alt="plus"
                    className="hover:opacity-80 hover:scale-110 transition transform duration-200 ease-in-out cursor-pointer"
                />
            </div>
        </div>
    );
};

export default Card;