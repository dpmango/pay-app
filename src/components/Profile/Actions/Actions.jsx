import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { SvgIcon, Avatar } from '@ui';
import { SessionStoreContext } from '@store';

import st from './Actions.module.scss';
import { useCallback } from 'react';

const Actions = observer(({ className }) => {
  const sessionContext = useContext(SessionStoreContext);
  const { t } = useTranslation('profile', { keyPrefix: 'actions' });
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    await sessionContext.logout();
    navigate('/auth');
  }, []);

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.nav}>
          <Link to="/" className={st.navLink}>
            <SvgIcon name="question" />
            <span>{t('faq')}</span>
          </Link>
          <Link to="/profile/settings" className={st.navLink}>
            <SvgIcon name="settings" />
            <span>Настройки</span>
          </Link>
          <a href="#" className={cns(st.navLink, st._danger)} onClick={handleLogout}>
            <span>{t('logout')}</span>
          </a>
        </div>

        <div className={st.app}>
          <div className={st.appName}>{t('appname')}</div>
          <div className={st.appVersion}>0.3.1</div>
        </div>
      </div>
    </section>
  );
});

export default Actions;
