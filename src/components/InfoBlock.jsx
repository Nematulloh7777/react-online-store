import React from 'react';
import { useDispatch } from 'react-redux'
import { clickOrderId } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const InfoBlock = ({title, description, imageUrl, isBtnBack, drawerClose, isNavigateHome}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isButtonBack = () => {
        if (isNavigateHome){
            navigate('/')
        } else {
            drawerClose()
            dispatch(clickOrderId(null))
        }
    }

    // setTimeout(() => {
    //     dispatch(clickOrderId(null))
    // }, 8000)

    return (
        <div className="flex flex-col items-center text-center w-72 mx-auto">
                <img height="80" width="80" src={imageUrl} alt="info image" />
                <h2 className="mt-4 text-2xl dark:text-white font-medium">{ title }</h2>
                <p className="text-gray-400 mt-2 mb-5">{ description }</p>
                {isBtnBack && 
                    <div className="relative">
                        <img className="absolute left-4 top-4 rotate-180" src="/img/arrow-next.svg" alt="arrow-next" />
        
                        <button
                            className="bg-[#9DD458] w-64 rounded-xl items-center hover:bg-lime-600 transition py-3 text-white active:bg-lime-700 focus:border-gray-400"
                            onClick={isButtonBack}
                        >
                            Вернуться назад
                        </button>
                    </div>
                }
        </div>
    );
};

export default InfoBlock;