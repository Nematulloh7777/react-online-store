import InfoBlock from '../components/InfoBlock';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CardList from './../components/CardList';
import Loader from '../components/UI/Loader/Loader';
import { useFetchFavoritesQuery } from '../redux/slices/api/apiProductsSlice';

const Favorites = () => {
    const navigate = useNavigate();
    const {data: favorites, error, isLoading} = useFetchFavoritesQuery()

    return (
        <div className="dark:text-white flex h-full items-center">
            {isLoading ? (
                <Loader />
            ) : error ? ( 
                <InfoBlock title="Ошибка" description={'Не удалось загрузить закладки. Попробуйте позже.'} imageUrl="/img/emoji-1.png" isBtnBack isNavigateHome />
            ) : !favorites.length ? (
                <InfoBlock title="Закладок нет :(" description="Вы ничего не добавляли в закладки" imageUrl="/img/emoji-1.png" isBtnBack isNavigateHome />
            ) : (
                <div>
                    <div className="flex items-center gap-5 mb-8">
                        <ArrowLeft 
                            size={28} 
                            onClick={() => navigate('/')} 
                            className="opacity-30 cursor-pointer transition dark:opacity-70 dark:hover:opacity-100 dark:text-white hover:-translate-x-1 hover:opacity-100" 
                        />
                        <h2 className="text-2xl font-bold">Мои Закладки</h2>
                    </div>
                    
                    <div className="mt-10">
                        <CardList items={favorites} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Favorites;