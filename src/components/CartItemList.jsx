import React from 'react';
import CartItem from './CartItem';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useSelector } from 'react-redux';

const CartItemList = () => {
    const [animationParent] = useAutoAnimate();
    const items = useSelector(state => state.cart.items)
    
    return (
        <div className="flex flex-col flex-1 gap-5" ref={animationParent}>
            {items.map(item => (
                <CartItem key={item.id} {...item} />
            ))}
        </div>
    );
};

export default CartItemList;