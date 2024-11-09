import React from 'react';
import { LoaderCircle } from 'lucide-react';

const Loader = () => {
    return (
        <div className='flex justify-center w-full'>
          <LoaderCircle className='animate-spin' strokeWidth={2} color='#0891b2' size={30} />
        </div>
    );
};

export default Loader;