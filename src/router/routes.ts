import DetailsCard from "../pages/DetailsCard";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home";
import NotFoundPage from "../pages/NotFoundPage";

export const allRoutes = [
    {path: '/', component: Home},
    {path: '/favorites', component: Favorites,},
    {path: '*', component: NotFoundPage},
    {path: '/details-product/:id', component: DetailsCard},
]