import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { Avatar, Tile } from '@c/Atom';
import { SessionStoreContext, UiStoreContext } from '@store';

import st from './Info.module.scss';

const Info = observer(({ className }) => {
  const { t } = useTranslation('profile', { keyPrefix: 'info' });
  const sessionContext = useContext(SessionStoreContext);
  const uiContext = useContext(UiStoreContext);

  const { profile } = sessionContext;

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
            title={profile.phone}
            description={t('phone')}
            icon="phone"
            className={st.gridCard}
          />
          {profile.defaultPaymentMethod ? (
            <Tile
              title={profile.defaultPaymentMethod.title}
              description={t('paymentMethod.selected')}
              image="/img/payment/visa.png"
              className={st.gridCard}
              onClick={() => uiContext.setModal('methodSelect')}
            />
          ) : (
            <Tile
              title={t('paymentMethod.empty')}
              description={t('paymentMethod')}
              className={st.gridCard}
              onClick={() => uiContext.setModal('methodSelect')}
            />
          )}
        </div>
      </div>
    </section>
  );
});

export default Info;
