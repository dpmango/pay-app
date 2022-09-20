import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { UiStoreContext } from '@store';
import { SvgIcon } from '@ui';
import { formatPrice } from '@helpers';

import st from './ScheduleCard.module.scss';

const ScheduleCard = ({ id, number, status, price, total, deadline, className }) => {
  const uiContext = useContext(UiStoreContext);
  const { t } = useTranslation('pay', { keyPrefix: 'schedule' });

  const progress = useMemo(() => {
    const percent = price / 12000;

    const round = percent.toLocaleString('en', {
      useGrouping: false,
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });

    return +round;
  }, [price]);

  const isCurrentPayment = status === 5;
  const isFailedPayment = status === 9;

  const deadlinyByStatus = useMemo(() => {
    let topic = '';
    let showDate = true;

    switch (status) {
      case 1:
        topic = t('status.willcharge');
        break;
      case 5:
        topic = t('status.willcharge');
        break;
      case 9:
        topic = t('status.error');
        showDate = false;
        break;
      case 10:
        topic = t('status.payed');
        break;
      default:
        break;
    }

    return `${topic} ${showDate ? deadline : ''}`;
  }, [status, deadline]);

  const radialStyle = useMemo(() => {
    let color = '';
    let colorTrail = '#EBEAEA';
    switch (status) {
      case 1:
        color = '#EBEAEA';
        break;
      case 5:
        color = '#34A8FF';
        break;
      case 9:
        color = '#E77676';
        colorTrail = '#E77676';
        break;
      case 10:
        color = '#A7C97C';
        break;
      default:
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
          <div className={st.cardNumber}>{number}</div>
        </div>
      </div>

      <div className={st.cardContent}>
        <div className={st.cardTitle}>{formatPrice(price)} ₽</div>
        <div className={st.cardDescription}>{deadlinyByStatus}</div>
      </div>

      <div
        className={cns(st.cardAction, (isCurrentPayment || isFailedPayment) && st._active)}
        onClick={() => uiContext.setModal('pay')}>
        <div className={st.cardActionIcon}>
          <SvgIcon name="card" />
        </div>
        <div className={st.cardActionName}>Оплатить</div>
      </div>
    </div>
  );
};

export default ScheduleCard;
