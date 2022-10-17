import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';
import { useTranslation } from 'react-i18next';

import { Image, Spinner } from '@ui';
import { PayoutStoreContext } from '@store';
import { formatPrice } from '@utils';

import ScheduleCard from './ScheduleCard';
import st from './Schedule.module.scss';

const Schedule = observer(({ className }) => {
  const payoutContext = useContext(PayoutStoreContext);
  const { payout } = payoutContext;
  const { t } = useTranslation('pay', { keyPrefix: 'schedule' });

  if (!Object.keys(payout).length) {
    return <Spinner />;
  }

  // if (!['Approved', 'Active', 'Paid'].includes(payout.status)) {
  //   return 'График платежей не показывается Не Active или Paid (dev - Approved)';
  // }

  if (payout.redemptions && payout.redemptions.length === 0) return null;

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.box}>
          <div className={st.head}>{t('title')}</div>

          <div className={st.list}>
            {payout.redemptions.map((payment, idx) => (
              <ScheduleCard
                {...payment}
                orderNum={idx + 1}
                className={st.listCard}
                key={payment.id}
              />
            ))}
          </div>

          <div className={st.tiles}>
            <div className={st.tile}>
              <div className={st.tileLabel}>{t('rest')}</div>
              <div className={st.tileValue}>{formatPrice(payoutContext.payoutSumLeft)} ₽</div>
            </div>
            <div className={st.tile}>
              <div className={st.tileLabel}>Карта Visa *8644</div>
              <div className={st.tileValue}>
                <Image src="/img/payment/visa.png" have2x={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Schedule;
