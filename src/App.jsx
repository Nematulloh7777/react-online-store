import React from 'react';
import Header from './components/Header';
import AppRouter from './components/AppRouter';
import Drawer from './components/UI/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer, openDrawer, toggleDrawer } from './redux/slices/drawerSlice';
import { useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import MobileHeader from './components/MobileHeaderDown/MobileHeader';

const App = () => {
  const dispatch = useDispatch();
  const drawerOpen = useSelector((state) => state.drawer.isOpen);
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {isAuthPage ? (

        location.pathname === '/login' ? <Login /> : <Register />
      ) : (
        <div className=" bg-white dark:bg-[#0f172a] min-h-screen xl:min-h-min xl:rounded-[25px] xl:mb-10 xl:w-[85%] xl:m-auto xl:mt-14 xl:shadow-lg xl:shadow-white/75">
          <Drawer drawerClose={() => dispatch(closeDrawer())} isOpen={drawerOpen} />
          <Header drawerOpen={() => dispatch(openDrawer())} />
          <MobileHeader toggleDrawer={() => dispatch(toggleDrawer())} />
          <div className="p-5 mb-16 xl:mb-0 xl:p-12">
            <AppRouter />
          </div>
        </div>
      )}
    </>
  );
};

export default App;