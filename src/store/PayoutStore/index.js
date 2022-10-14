import React from 'react';

import PayoutStore from './PayoutStore';

const payout = new PayoutStore();
const PayoutStoreContext = React.createContext(payout);

export { payout, PayoutStoreContext };
