import Routes from '@c/Routes';
import ReactTooltip from 'react-tooltip';
import { useEventListener } from '@hooks';
import { observer } from 'mobx-react-lite';
import { SessionStoreContext } from '@store';
import React, { useCallback, useContext } from 'react';
import { LOCAL_STORAGE_SESSION } from '@config/localStorage';

const App = observer(() => {
  const sessionContext = useContext(SessionStoreContext);

  const persistTabsStore = useCallback((e) => {
    if (e.key === LOCAL_STORAGE_SESSION) {
      sessionContext.hydrateStore();
    }
  }, []);

  useEventListener('storage', persistTabsStore);

  return (
    <>
      <Routes />
      <ReactTooltip html={true} effect="solid" backgroundColor="#3D3D46" textColor="#FFFFFF" />
    </>
  );
});

export default App;
