import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { ArrowLeft } from 'lucide-react';
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/slices/cartSlice';
import { openDrawer } from '../redux/slices/drawerSlice';

const DetailsCard = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const items = useSelector(state => state.products.items)
    const product = items.find(item => item.id === Number(id))

    const productInCart = useSelector(state => state.cart.items)
    
    const findProductInCart = productInCart.find(item => item.id === Number(id))

    return (
        <>
            {product ? (
                <>
                    <div className="flex items-center gap-5 mb-10" >
                        <ArrowLeft onClick={() => navigate(`/`)} className="text-slate-400 cursor-pointer transition hover:-translate-x-1 hover:text-black dark:hover:text-slate-500 dark:text-white" size={32} />
                        <h2 className="text-2xl font-bold dark:text-white">Подробности о товара </h2>
                    </div>
                    
                    <div className="flex justify-start ml-16 gap-14">

                        <div className='dark:bg-gray-200 rounded-lg p-2 h-full'>
                            <img className='w-[250px] mix-blend-multiply' src={product?.imageUrl} alt="Product Image" />
                        </div>

                        <div className="w-1/3">
                            <h1 className="text-2xl mb-3 dark:text-white">{ product?.title }</h1>
                            <span className="text-base text-slate-400 ">Код товара: { product?.id }000010 </span>
                            
                            <div className="mt-3 border-b pb-3 mb-3" />

                            <h1 className="text-2xl text-blue-600 dark:text-blue-400 font-bold"> Все характеристики</h1>
                            <p className="mt-2 dark:text-white text-justify" >
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit est eaque
                                debitis molestiae
                                corrupti placeat obcaecati atque odio Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Dolorem mollitia iure tenetur ducimus quasi vel accusantium totam at ipsa dolorum animi qui minus id
                                nam accusamus nesciunt, ad voluptatibus! Rerum?
                            </p>
                    </div>

                    <div className="rounded-lg border shadow-[0px_6px_40px_-12px_rgba(0,0,0,0.3)] w-[340px] h-full p-5">
                        <span className='text-slate-400'>ЦЕНА:</span>
                        <br />
                        <b className="text-2xl dark:text-white">{ product?.price } руб.</b>

                        {findProductInCart ? (
                            <>
                                <button
                                    type="button" 
                                    disabled 
                                    className="bg-gradient-to-br from-[#0093E9] to-[#2cc4b2] mt-7 w-full rounded-xl py-3 text-white cursor-pointer  hover:from-[#1097e6] hover:to-[#209689] transition disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-400 "
                                >
                                    <span>Товар добавлен в корзину</span>
                                </button>
                                <div className='flex justify-center mt-1 ' >
                                    <span 
                                        onClick={() => dispatch(openDrawer())} className='hover:underline decoration-2 hover:decoration-sky-500 cursor-pointer dark:text-white'
                                    >
                                        Перейти в корзину
                                    </span>
                                </div>
                            </>
                        ) : (

                            <button
                                className="bg-gradient-to-br from-[#0093E9] to-[#2cc4b2] mt-7 w-full rounded-xl py-3 text-white cursor-pointer  hover:from-[#1097e6] hover:to-[#209689] transition disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-400 "
                                onClick={() => dispatch(addProduct(product))}
                            >
                                <span>Добавить в корзину</span>
                            </button>
                        )}

                    </div>

                </div>
            </>
            ) : (
                <p className='text-red-400 flex justify-center'>
                    Product with Id {id} not found.
                </p>
            )}

        </>
    );
};

export default DetailsCard;