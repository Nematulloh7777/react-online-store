import React from 'react';
import { useDispatch } from 'react-redux'
import { removeProduct } from '../redux/slices/cartSlice';

const CartItem = ({id, imageUrl, title, price}) => {
    const dispatch = useDispatch()

    const item = {
        id,
        title,
        price,
        imageUrl,
    }

    return (
        <div className="flex shadow-sm items-center border border-slate-200 p-4 rounded-xl gap-4">
            <div className='dark:bg-gray-300 rounded p-1'>
                <img className="w-16 h-16 mix-blend-multiply" src={imageUrl} alt="sneakers" />
            </div>
 

            <div className="flex flex-col flex-1 dark:text-white">
                <p>{title}</p>

                <div className="flex justify-between mt-2">
                    <b className="flex-1">{price} руб.</b>
                    <img onClick={() => dispatch(removeProduct(item))} className="opacity-40 hover:opacity-100 transition cursor-pointer"
                        src="/img/close.svg" alt="close" />
                </div>
            </div>
            
        </div>
    );
};

export default CartItem;