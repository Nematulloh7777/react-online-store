import React, { useState, useEffect } from 'react';
import DrawerHead from './DrawerHead';
import CartItemList from './../../CartItemList';
import { useSelector, useDispatch } from 'react-redux';
import InfoBlock from './../../InfoBlock';
import { createOrder } from '../../../redux/slices/cartSlice';

const useAnimatedNumber = (value, duration = 60) => {
    const [animatedValue, setAnimatedValue] = useState(value);

    useEffect(() => {
        let startValue = animatedValue;
        let startTime = performance.now();

        const updateValue = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const newValue = Math.round(startValue + (value - startValue) * progress);
            setAnimatedValue(newValue);

            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        };

        requestAnimationFrame(updateValue);
    }, [value, duration, animatedValue]);

    return animatedValue;
};

const Drawer = ({ drawerClose, isOpen }) => {
    const { totalPrice, orderId, items } = useSelector((state) => state.cart);
    const vatPrice = Math.round((totalPrice * 5) / 100);
    const totalPayment = totalPrice + vatPrice;

    const dispatch = useDispatch();

    const [drawerState, setDrawerState] = useState(isOpen);

    const animatedTotalPrice = useAnimatedNumber(totalPrice);
    const animatedVatPrice = useAnimatedNumber(vatPrice);
    const animatedTotalPayment = useAnimatedNumber(totalPayment);

    useEffect(() => {
        setDrawerState(isOpen);
    }, [isOpen]);

    return (
        <>
            {/* Overlay */}
            <div 
                onClick={drawerClose} 
                className={`fixed top-0 left-0 h-full w-full bg-black z-20 transition-opacity duration-300 ${drawerState ? 'opacity-70' : 'opacity-0 pointer-events-none'}`}
            ></div>

            {/* Drawer */}
            <div
                className={`bg-white w-96 h-full dark:bg-[#0f172a] fixed right-0 top-0 z-30 max-h-screen overflow-y-auto transition-transform duration-300 ease-in-out transform ${
                    drawerState ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <DrawerHead drawerClose={drawerClose} totalPrice={totalPrice} />

                {!totalPrice ? (
                    <div className="flex h-full items-center">
                        {orderId ? (
                            <InfoBlock
                                title={"Заказ оформлен!"}
                                description={`Ваш заказ #${orderId} скоро будет передан курьерской доставке.`}
                                imageUrl={"/img/order-success-icon.png"}
                                isBtnBack={true}
                                drawerClose={() => drawerClose(false)}
                            />
                        ) : (
                            <InfoBlock
                                title={'Корзина пустая'}
                                description={'Добавьте хотя бы один товар, чтобы сделать заказ.'}
                                imageUrl={'/img/package-icon.png'}
                                isBtnBack={true}
                                drawerClose={() => drawerClose(false)}
                            />
                        )}
                    </div>
                ) : (
                    <>
                        <div className="m-5">
                            <CartItemList />
                        </div>

                        <div className="sticky bottom-0 p-4 border-t border-slate-200 bg-white dark:bg-[#0f172a] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                            <div className="flex gap-2 dark:text-white">
                                <span>Количество товаров:</span>
                                <div className="flex-1 border-b border-dashed"></div>
                                <b>{items.length} шт.</b>
                            </div>

                            <div className="flex gap-2 dark:text-white transition-all duration-500 ease-in-out">
                                <span>Общая цена:</span>
                                <div className="flex-1 border-b border-dashed"></div>
                                <b className="transition-colors duration-500 ease-in-out">{animatedTotalPrice} руб.</b>
                            </div>

                            <div className="flex gap-2 dark:text-white transition-all duration-500 ease-in-out">
                                <span>Налог 5%:</span>
                                <div className="flex-1 border-b border-dashed"></div>
                                <b className="transition-colors duration-500 ease-in-out">{animatedVatPrice} руб.</b>
                            </div>

                            <div className="flex gap-2 dark:text-white transition-all duration-500 ease-in-out">
                                <span>Итого:</span>
                                <div className="flex-1 border-b border-dashed"></div>
                                <b className="transition-colors duration-500 ease-in-out">{animatedTotalPayment} руб.</b>
                            </div>

                            <button
                                className="bg-lime-500 mt-7 w-full rounded-xl py-3 text-white cursor-pointer disabled:bg-slate-300 hover:bg-lime-600 transition active:bg-lime-700"
                                onClick={() => dispatch(createOrder())}
                            >
                                Оформить заказ
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Drawer;




// Old Drawer !!!

// import React from 'react';
// import DrawerHead from './DrawerHead';
// import CartItemList from './../../CartItemList';
// import { useSelector, useDispatch } from 'react-redux';
// import InfoBlock from './../../InfoBlock';
// import { createOrder } from '../../../redux/slices/cartSlice';

// const Drawer = ({ drawerClose }) => {
//     const {totalPrice, orderId} = useSelector(state => state.cart);
//     const vatPrice = Math.round((totalPrice * 5) / 100);
//     const totalPayment = totalPrice + vatPrice;

//     const dispatch = useDispatch()

//     return (
//         <>  
//             <div onClick={() => drawerClose(false)} className="fixed top-0 left-0 h-full w-full bg-black z-20 opacity-70"></div>
//             <div className="bg-white w-96 h-full dark:bg-[#0f172a] fixed right-0 top-0 z-30 max-h-screen overflow-y-auto">
//                 <DrawerHead drawerClose={() => drawerClose(false)} totalPrice={totalPrice} />

//                 {!totalPrice ? (
//                     <div className="flex h-full items-center">
//                         {orderId ? (
//                             <InfoBlock 
//                                 title={"Заказ оформлен!"}
//                                 description={`Ваш заказ #${orderId} скоро будет передан курьерской доставке.`}
//                                 imageUrl={"/img/order-success-icon.png"} 
//                                 isBtnBack={true} 
//                                 drawerClose={() => drawerClose(false)}
//                             />
//                         ) : (
//                             <InfoBlock 
//                                 title={'Корзина пустая'} 
//                                 description={'Добавьте хотя бы одну таваров, чтобы сделать заказ.'} imageUrl={'/img/package-icon.png'}
//                             />
//                         )}
//                     </div>
//                 ) : (
//                     <>
//                         <div className="m-5" >
//                             <CartItemList />
//                         </div>

//                         <div className="sticky bottom-0 p-4 border-t border-slate-200 bg-white  dark:bg-[#0f172a] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
//                             <div className="flex gap-2 dark:text-white">
//                                 <span>Общая цена:</span>
//                                 <div className="flex-1 border-b border-dashed"></div>
//                                 <b>{totalPrice} руб.</b>
//                             </div>

//                             <div className="flex gap-2 dark:text-white">
//                                 <span>Налог 5%:</span>
//                                 <div className="flex-1 border-b border-dashed"></div>
//                                 <b>{vatPrice} руб.</b>
//                             </div>

//                             <div className="flex gap-2 dark:text-white">
//                                 <span>Итого:</span>
//                                 <div className="flex-1 border-b border-dashed"></div>
//                                 <b>{totalPayment} руб.</b>
//                             </div>

//                             <button
//                                 className="bg-lime-500 mt-7 w-full rounded-xl py-3 text-white cursor-pointer disabled:bg-slate-300 hover:bg-lime-600 transition active:bg-lime-700"
//                                 onClick={() => dispatch(createOrder())}
//                             >
//                                 Оформить заказ
//                             </button>
//                         </div>
//                     </>
//                 )}

//             </div>
//         </>
//     );
// };

// export default Drawer;