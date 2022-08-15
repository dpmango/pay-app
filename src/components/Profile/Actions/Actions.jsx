import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { SvgIcon, Avatar } from '@ui';
import { UiStoreContext } from '@store';

import st from './Actions.module.scss';

const Actions = observer(({ className }) => {
  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <section className={cns(st.container, className)}>
        <div className="container">
          <div className={st.nav}>
            <Link to="/" className={st.navLink}>
              <SvgIcon name="question" />
              <span>Часто задаваемые вопросы</span>
            </Link>
            <Link to="/" className={st.navLink}>
              <SvgIcon name="settings" />
              <span>Настройки</span>
            </Link>
            <Link to="/" className={cns(st.navLink, st._danger)}>
              <span>Выйти из приложения</span>
            </Link>
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
