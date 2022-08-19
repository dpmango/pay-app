import React, { useCallback, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ReactTooltip from 'react-tooltip';

import { Loader, LoaderContextProvider } from '@ui';
import { useEventListener } from '@hooks';
import { SessionStoreContext } from '@store';
import { LOCAL_STORAGE_SESSION } from '@config/localStorage';

import Routes from '@c/Routes';

const App = observer(() => {
  // const sessionContext = useContext(SessionStoreContext);

  // const persistTabsStore = useCallback((e) => {
  //   if (e.key === LOCAL_STORAGE_SESSION) {
  //     sessionContext.hydrateStore();
  //   }
  // }, []);

  // useEventListener('storage', persistTabsStore);

  return (
    <LoaderContextProvider>
      <Routes />
      <ReactTooltip html={true} effect="solid" backgroundColor="#3D3D46" textColor="#FFFFFF" />
    </LoaderContextProvider>
  );
});

export default App;
