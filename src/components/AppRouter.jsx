import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { allRoutes } from '../router/routes';
const AppRouter = () => {
    return (
        <Routes>
            {allRoutes.map(route=> (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.component />}
                />
            ))}
        </Routes>
    );
};

export default AppRouter;