import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { UiStoreContext, PayoutStoreContext } from '@store';
import { SvgIcon } from '@ui';
import { formatPrice, formatDate } from '@utils';

import st from './ScheduleCard.module.scss';

// redemptions type
const ScheduleCard = ({
  orderNum,
  sum,
  status,
  createdAt,
  errorDescription,
  isNextPayment,
  className,
}) => {
  const uiContext = useContext(UiStoreContext);
  const payoutContext = useContext(PayoutStoreContext);
  const { t } = useTranslation('pay', { keyPrefix: 'schedule' });

  const progress = useMemo(() => {
    const percent = sum / payoutContext.sum;

    const round = percent.toLocaleString('en', {
      useGrouping: false,
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });

    return +round;
  }, [sum, payoutContext.sum]);

  // если нет статуса, значит обьект от plannedRedemptions
  const isCurrentPayment = ['IProcess'].includes(status);
  const isFailedPayment = ['Failed'].includes(status);

  const deadline = useMemo(() => {
    return formatDate(createdAt);
  }, [createdAt]);

  const descriptionText = useMemo(() => {
    let topic = '';
    let showDate = true;

    switch (status) {
      case 'InProcess':
        topic = t('status.pending');
        break;
      case 'Failed':
        topic = t('status.error');
        showDate = false;
        break;
      case 'Succeeded':
        topic = t('status.payed');
        break;
      default:
        topic = t('status.willcharge');
        break;
    }

    return `${topic} ${showDate ? deadline : ''}`;
  }, [status, deadline]);

  const radialStyle = useMemo(() => {
    let color = '';
    let colorTrail = '#EBEAEA';

    switch (status) {
      case 'InProcess':
        color = '#34A8FF';
        break;
      case 'Failed':
        color = '#E77676';
        colorTrail = '#E77676';
        break;
      case 'Succeeded':
        color = '#A7C97C';
        break;
      default:
        color = '#34A8FF';
        break;
    }

    return buildStyles({
      pathTransitionDuration: 0.5,
      pathColor: color,
      trailColor: colorTrail,
    });
  }, [status]);

  return (
    <div
      className={cns(
        st.card,
        isCurrentPayment && st._current,
        isNextPayment && st._next,
        isFailedPayment && st._failed,
        className
      )}>
      <div className={st.cardLeft}>
        <div className={st.cardRadial}>
          <CircularProgressbar
            strokeWidth={10}
            value={progress}
            maxValue={1}
            styles={radialStyle}
          />
          <div className={st.cardNumber}>{formatPrice(orderNum)}</div>
        </div>
      </div>

      <div className={st.cardContent}>
        <div className={st.cardTitle}>{formatPrice(sum)} ₽</div>
        <div className={st.cardDescription}>{descriptionText}</div>
      </div>

      <div
        className={cns(st.cardAction, (isNextPayment || isFailedPayment) && st._active)}
        onClick={() => uiContext.setModal('pay')}>
        <div className={st.cardActionIcon}>
          <SvgIcon name="card" />
        </div>
        <div className={st.cardActionName} onClick={() => uiContext.setModal('pay')}>
          {t('action')}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
