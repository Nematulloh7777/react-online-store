import React from 'react';
import Header from './components/Header';
import AppRouter from './components/AppRouter';
import Drawer from './components/UI/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer, openDrawer } from './redux/slices/drawerSlice';

const App = () => {
  const dispatch = useDispatch()
  const drawerOpen = useSelector(state => state.drawer.isOpen)

  return (
    <div className="bg-white dark:bg-[#0f172a] rounded-[25px] mb-10 w-[85%] m-auto mt-14 shadow-lg shadow-white/75">
       <Drawer drawerClose={() => dispatch(closeDrawer())} isOpen={drawerOpen} />

       <Header drawerOpen={() => dispatch(openDrawer())}/>

       <div className="p-12">
          <AppRouter />
       </div>
    </div>
  );
};

export default App;