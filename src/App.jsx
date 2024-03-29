import React, { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SessionStoreContext, MethodStoreContext } from '@store';
import Routes from './pages';
import { useEffect } from 'react';

const App = () => {
  const sessionContext = useContext(SessionStoreContext);
  const methodContent = useContext(MethodStoreContext);

  useEffect(() => {
    const useLogout = async ({ status }) => {
      if (status === 401) await sessionContext.logout();
    };

    const initStore = async () => {
      await sessionContext.init().catch(useLogout);
      await methodContent.init().catch(useLogout);
    };

    initStore();
  }, []);

  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );
};

export default App;
