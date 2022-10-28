import React, { useMemo, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import cns from 'classnames';

import { Spinner } from '@ui';
import { PayoutStoreContext } from '@store';
import { formatPrice } from '@utils';

import st from './Upgrade.module.scss';

const Upgrade = observer(({ className, defaultOpen, isUpgrade }) => {
  const { payout, selectedPlan } = useContext(PayoutStoreContext);
  const { t } = useTranslation('pay', { keyPrefix: 'upgrade' });

  let { id } = useParams();

  const count = useMemo(() => {
    if (!selectedPlan) return null;
    return selectedPlan.duration;
  }, [selectedPlan]);

  if (!Object.keys(payout).length) {
    return <Spinner />;
  }

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={cns(st.box)}>
          <div className={st.stats}>
            <div className={st.stat}>
              <div className={st.statTitle}>{formatPrice(payout.sum)} ₽</div>
              <div className={st.label}>{t('newSum')}</div>
            </div>
            {count && (
              <div className={st.stat}>
                <div className={st.statTitle}>{count} </div>
                <div className={st.label}>{t('count')}</div>
              </div>
            )}
          </div>
          {selectedPlan && (
            <div className={st.new}>
              <div className={st.label}>{t('description')}</div>
              <div className={st.newValue}>{formatPrice(selectedPlan.firstSum)} ₽</div>
              {/* <div className={st.newDeadline}>{t('redemptionat')}</div> */}
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

export default Upgrade;
