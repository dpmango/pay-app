import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { SessionStoreContext } from '@store';

import { AuthPhone, AuthCode } from '@c/Auth';
import st from './Auth.module.scss';

const Auth = observer(({ tab, className }) => {
  const { phone } = useContext(SessionStoreContext);

  return (
    <section className={cns(st.container, className)}>
      <div className="container">{!phone ? <AuthPhone /> : <AuthCode />}</div>
    </section>
  );
});

export default Auth;
