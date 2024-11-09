import DetailsCard from "../pages/DetailsCard";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFoundPage from "../pages/NotFoundPage";
import Register from "../pages/Register";

export const allRoutes = [
    {path: '/', component: Home},
    {path: '/favorites', component: Favorites,},
    {path: '*', component: NotFoundPage},
    {path: '/details-product/:id', component: DetailsCard},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
]