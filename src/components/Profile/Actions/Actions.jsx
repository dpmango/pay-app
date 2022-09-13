import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { SvgIcon, Avatar } from '@ui';
import { SessionStoreContext } from '@store';

import st from './Actions.module.scss';
import { useCallback } from 'react';

const Actions = observer(({ className }) => {
  const sessionContext = useContext(SessionStoreContext);

  const handleLogout = useCallback(() => {
    sessionContext.logout();
  }, []);

  return (
    <>
      <section className={cns(st.container, className)}>
        <div className="container">
          <div className={st.nav}>
            <Link to="/" className={st.navLink}>
              <SvgIcon name="question" />
              <span>Часто задаваемые вопросы</span>
            </Link>
            {/* <Link to="/" className={st.navLink}>
              <SvgIcon name="settings" />
              <span>Настройки</span>
            </Link> */}
            <a href="#" className={cns(st.navLink, st._danger)} onClick={handleLogout}>
              <span>Выйти из приложения</span>
            </a>
          </div>

          <div className={st.app}>
            <div className={st.appName}>Контакты</div>
            <div className={st.appVersion}>0.3.1</div>
          </div>
        </div>
      </section>
    </>
  );
});

export default Actions;
