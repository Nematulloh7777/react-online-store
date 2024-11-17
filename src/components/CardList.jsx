import Card from './Card';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Error from './Error';
import {
    useFetchFavoritesQuery,
    useAddToFavoritesMutation,
    useRemoveFromFavoritesMutation
} from '../redux/slices/api/apiProductsSlice';

const CardList = ({ items, isLoading, text, error, errorText }) => {
    const [animationParent] = useAutoAnimate();
    const { data: favoritesData = [], isLoading: isFavoritesLoading } = useFetchFavoritesQuery();
    const [addToFavorites] = useAddToFavoritesMutation();
    const [removeFromFavorites] = useRemoveFromFavoritesMutation();

    const favorites = favoritesData.reduce((acc, item) => {
        acc[item.parentId] = item.id;
        return acc;
    }, {});

    const skeletonArray = new Array(8).fill(0);

    const toggleFavorite = async (item) => {
        const itemId = item.parentId || item.id;

        try {
            if (favorites[itemId]) {
                await removeFromFavorites(favorites[itemId]);
            } else {
                await addToFavorites({
                    id: itemId,
                    parentId: itemId,
                    title: item.title,
                    price: item.price,
                    imageUrl: item.imageUrl,
                });
            }
        } catch (error) {
            console.error("Ошибка при обновлении избранного:", error);
        }
    };

    return (
        <div className='grid grid-cols-2 xl:grid-cols-4 md:grid-cols-3 gap-4' ref={animationParent} >
            {error ? (
                <Error errorText={errorText} />
            ) : isLoading || isFavoritesLoading ? (
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
                        <Card
                            key={item.parentId || item.id}
                            id={item.parentId || item.id} 
                            imageUrl={item.imageUrl}
                            title={item.title}
                            price={item.price}
                            isFavorite={!!favorites[item.parentId || item.id]}
                            onToggleFavorite={() => toggleFavorite(item)}
                            text={text}
                        />
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