import React from 'react';
import Card from './Card';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Error from './Error';

const CardList = ({ items, isLoading, text, error, errorText }) => {
    const [animationParent] = useAutoAnimate();
    const skeletonArray = new Array(8).fill(0);

    return (
        <div className='grid grid-cols-4 gap-5' ref={animationParent} >
            {error ? (
                <Error errorText={errorText} />
            ) : isLoading ? (
                skeletonArray.map((_, index) => (
                    <div key={index} className="animate-pulse border rounded-3xl p-8 border-slate-200">
                        <div className="bg-gray-300 h-40 mb-4 rounded-xl"></div>
                        <div className="bg-gray-300 h-4 mb-2 rounded-xl"></div>
                        <div className="bg-gray-300 h-4 w-2/3 mb-2 rounded-xl"></div>
                        <div className='flex justify-between'>
                            <div className="bg-gray-300 h-6 w-1/2 mt-4 rounded-xl flex flex-col"></div>
                            <div className="bg-gray-300 h-8 w-8 mt-3 rounded-md"></div>
                        </div>
                    </div>
                ))
            ) : (
                
                items.length > 0 ? (
                    items.map(item => (
                        <Card key={item.id} {...item} text={text} />
                    ))
                ) : (
                    <div className="col-span-4 flex flex-col items-center">
                        <span className='text-2xl font-bold dark:text-white'>Ничего не нашлось по запросу "{text}"</span>
                        <span className='text-slate-400'>Попробуйте поискать по-другому или сократить запрос</span>
                    </div>
                )
            )}
        </div>
    );
};

export default CardList;