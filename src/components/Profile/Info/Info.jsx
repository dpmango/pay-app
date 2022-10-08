import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { SvgIcon, Avatar, Tile } from '@ui';
import { SessionStoreContext } from '@store';

import st from './Info.module.scss';

const Info = observer(({ className }) => {
  const { t } = useTranslation('profile', { keyPrefix: 'info' });
  const sessionContext = useContext(SessionStoreContext);

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.head}>
          <Avatar name={sessionContext.shortName} variant="big" />
          <div className={st.title}>
            {t('title')} <br />
            {sessionContext.displayName}!
          </div>
        </div>

        <div className={st.grid}>
          <Tile
            title={sessionContext.profile.phone}
            description={t('phone')}
            icon="phone"
            className={st.gridCard}
          />
          {sessionContext.profile.defaultPaymentMethod ? (
            <Tile
              title={defaultPaymentMethod.title}
              description={t('paymentMethod')}
              image="/img/payment/visa.png"
              className={st.gridCard}
            />
          ) : (
            <Tile
              title="Метод не выбран"
              description={t('paymentMethod')}
              image="/img/payment/visa.png"
              className={st.gridCard}
            />
          )}
        </div>
      </div>
    </section>
  );
});

export default Info;
