import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { SvgIcon, Avatar, Tile } from '@ui';
import { UiStoreContext } from '@store';

import st from './Info.module.scss';

const Info = observer(({ className }) => {
  const uiContext = useContext(UiStoreContext);
  const { t } = useTranslation('profile', { keyPrefix: 'info' });

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.head}>
          <Avatar variant="big" />
          <div className={st.title}>
            {t('title')} <br />
            Александр!
          </div>
        </div>

        <div className={st.grid}>
          <Tile
            title="+7 (954) 450-45-34"
            description={t('phone')}
            icon="phone"
            className={st.gridCard}
          />
          {/* <Tile
              title="alex@mail.ru"
              description="Эл. почта"
              icon="email"
              className={st.gridCard}
            /> */}
          <Tile
            title="Карта Visa *8644"
            description={t('paymentMethod')}
            image="/img/payment/visa.png"
            className={st.gridCard}
          />
        </div>
      </div>
    </section>
  );
});

export default Info;
