import React, { useState, useEffect, useCallback } from 'react';
import CardList from '../components/CardList';
import debounce from 'lodash.debounce';
import { useSelector, useDispatch } from 'react-redux'
import { setSort } from '../redux/slices/filterSlice';
import { X } from 'lucide-react'
import { fetchProducts } from '../redux/slices/productsSlice';

const Home = () => {
    const [searchIcon, setSearchIcon] = useState("/img/search.svg");
    const [filters, setFilters] = useState({
        searchQuery: ''
    });

    const dispatch = useDispatch()
    const sortBy = useSelector(state => state.filter.sort)
    const { items, status, error} = useSelector(state => state.products)

    const inputRef = React.useRef()

    const clearInput = () => {
        const searchQuery = ''
        inputRef.current.focus()
        setFilters(prevFilters => ({
            ...prevFilters,
            searchQuery
        }));
    };

    const handleInputChange = (e) => {
        const searchQuery = e.target.value;

        setFilters(prevFilters => ({
            ...prevFilters,
            searchQuery
        }));

        setSearchIcon(searchQuery.length > 0 ? "/img/search3.png" : "/img/search.svg");
    };

    const onChangeSelect = (e) => {
        dispatch(setSort(e.target.value))
        const sortBy = e.target.value;
        setFilters(prevFilters => ({
            ...prevFilters,
            sortBy
        }));
    };

    const fetchItems = async () => {
        const params = {
            sortBy: sortBy,
        }
        if (filters.searchQuery) {
            params.title = `*${filters.searchQuery}*`;
        }

        dispatch(fetchProducts(params))
    }

    const debouncedFetchItems = useCallback(
        debounce(() => {
            fetchItems();
        }, 300),
        [filters, sortBy] 
    )

    useEffect(() => {
        debouncedFetchItems();
        
        return debouncedFetchItems.cancel;
    }, [filters, sortBy]);

    return (
        <div className='dark:bg-[#0f172a]'>
            <div className='xl:flex xl:justify-between xl:items-center'>
            {/* <div className=' flex justify-between items-center '> */}
                <h2 className='text-3xl font-bold hidden xl:flex dark:text-white'>Все товары</h2>

                <div className='flex xl:flex-row flex-col gap-4'>
                    <select
                        value={sortBy}
                        onChange={onChangeSelect}
                        className="dark:bg-[#0f172a] w-[220px] order-2 xl:order-1 cursor-pointer dark:text-white py-2 px-3 border focus:border-gray-400 rounded-md outline-none"
                    >
                        <option value="title" className='dark:text-white'>По названию</option>
                        <option value="price" className='dark:text-white'>По цене (дешевые)</option>
                        <option value="-price" className='dark:text-white'>По цене (дорогие)</option>
                    </select>

                    
                    <div className='relative order-1'>
                        <img src={searchIcon} alt="search" className='absolute top-3 left-4' />
                        <input 
                            ref={inputRef}
                            value={filters.searchQuery}
                            onChange={handleInputChange}
                            placeholder='Поиск...'
                            className="border rounded-md  outline-none w-full xl:w-auto py-2 pl-11 pr-8 focus:border-gray-400 dark:bg-[#0f172a] dark:text-white"
                        /> 
                        {filters.searchQuery && (
                            <X 
                                className='dark:text-white transition-all duration-300 text-slate-400 cursor-pointer absolute top-2 right-2 hover:text-black dark:hover:text-slate-400 ' 
                                onClick={clearInput}
                            />
                        )}
                    </div>
                    <h2 className='text-2xl font-bold order-3 xl:hidden dark:text-white'>Все товары</h2>
                </div>
            </div>

            <div className='mt-10'>
                <CardList 
                    items={items} 
                    isLoading={status === 'loading'} 
                    error={status === 'error'} 
                    errorText={error}
                    text={filters.searchQuery} 
                />
            </div>

        </div>
    );
};

export default Home;