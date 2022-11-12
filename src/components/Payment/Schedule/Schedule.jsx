import React, { useContext, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';
import { useTranslation } from 'react-i18next';

import { Image, Spinner, ApiImage } from '@ui';
import { PayoutStoreContext } from '@store';
import { formatPrice } from '@utils';

import ScheduleCard from './ScheduleCard';
import st from './Schedule.module.scss';

const Schedule = observer(({ className }) => {
  const payoutContext = useContext(PayoutStoreContext);
  const { payout } = payoutContext;
  const { t } = useTranslation('pay', { keyPrefix: 'schedule' });

  const schedule = useMemo(() => {
    try {
      let returnable = null;
      if (payout.redemptions && payout.redemptions.length) {
        returnable = [...payout.redemptions];
      }
      if (payout.plannedRedemptions && payout.plannedRedemptions.length) {
        returnable = [
          ...returnable,
          ...payout.plannedRedemptions.map((x, idx) => ({
            ...x,
            isNextPayment: idx === 0,
          })),
        ];
      }

      return returnable;
    } catch (err) {
      return null;
    }
  }, [payout.id, payout.redemptions, payout.plannedRedemptions]);

  if (!Object.keys(payout).length) {
    return <Spinner />;
  }

  if (!schedule) return null;

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.box}>
          <div className={st.head}>{t('title')}</div>

          <div className={st.list}>
            {schedule.map((payment, idx) => (
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
            {payout.paymentMethod && (
              <div className={st.tile}>
                <div className={st.tileLabel}>{payout.paymentMethod.title}</div>
                <div className={st.tileValue}>
                  <div className={st.tileImage}>
                    <ApiImage slug={payout.paymentMethod.iconSlug} width={100} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Schedule;
