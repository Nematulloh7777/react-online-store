import React from 'react';

const MobileModal = ({isOpen = false}) => {
    return (
        <>
            <div className={`absolute opacity-50 top-0 left-0 right-0 bg-black z-10 transition-opacity duration-300 min-h-[120vh] ${isOpen ? 'flex' : 'hidden'}`} />
            <div className={`absolute left-0 dark:bg-[#0f172a] top-0 w-1/2 bg-white z-20 min-h-[150vh] ${isOpen ? 'flex' : 'hidden'}`}>
                <div className='mt-20 p-4'>
                    <span className='dark:text-white text-sm'>Все товары</span>
                </div>
            </div>
        </>
    );
};

export default MobileModal;