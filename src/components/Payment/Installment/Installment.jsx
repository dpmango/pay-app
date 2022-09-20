import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { SvgIcon, Button, Image } from '@ui';
import { UiStoreContext } from '@store';

import st from './Installment.module.scss';

const Installment = observer(({ className }) => {
  const [periods, setPeriods] = useState([3, 6, 9, 12]);
  const [selectedPeriod, setSelectedPeriod] = useState(6);

  const uiContext = useContext(UiStoreContext);
  const { t } = useTranslation('pay', { keyPrefix: 'installment' });

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.head}>
          <SvgIcon name="logo" />
          <span>{t('title')}</span>
        </div>

        <div className={st.payments}>
          <div className={st.payment}>
            <div className={st.paymentTitle}>56 000 ₽</div>
            <div className={st.paymentDesc}>{t('firstPayment')}</div>
          </div>
          <div className={st.payment}>
            <div className={st.paymentTitle}>4200 ₽</div>
            <div className={st.paymentDesc}>{t('inMount')}</div>
          </div>
        </div>

        <div className={st.monts}>
          {periods &&
            periods.map((period, idx) => (
              <div className={st.month} key={idx}>
                <Button
                  theme={selectedPeriod === period ? 'blue' : 'green'}
                  block
                  onClick={() => setSelectedPeriod(period)}>
                  {period} {t('month')}
                </Button>
              </div>
            ))}
        </div>

        <div className={st.cta}>
          <Button
            block
            onClick={() => {
              uiContext.setModal('error');
            }}>
            {t('action')}
          </Button>
        </div>

        <div className={st.link}>
          <a href="">{t('terms')}</a>
        </div>
      </div>
    </section>
  );
});

export default Installment;
