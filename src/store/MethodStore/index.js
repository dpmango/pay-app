import React from 'react';

import MethodStore from './MethodStore';

const method = new MethodStore();
const MethodStoreContext = React.createContext(method);

export { method, MethodStoreContext };
