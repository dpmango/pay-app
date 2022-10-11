import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { ApiImage } from '@ui';
import { formatPrice } from '@utils';

import st from './ShopCard.module.scss';
import { useCallback } from 'react';
const radialStyle = buildStyles({
  pathTransitionDuration: 0.5,
  pathColor: '#34A8FF',
  trailColor: '#EBEAEA',
});

const ShopCard = ({ id, partner, description, status, sum, sumPaid, isShopCard, className }) => {
  const { t } = useTranslation('shop');

  const navigate = useNavigate();

  const progress = useMemo(() => {
    const percent = sumPaid / sum;
    const round = percent.toLocaleString('en', {
      useGrouping: false,
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    });

    return +round;
  }, [sum, sumPaid]);

  // Offerred – предложена, но не оформлена.
  // Approving – на рассмотрении.
  // IncompleteProfile - требуется дозаполнение профиля.
  // DocumentsRequired - требуется догрузить документы.
  // Approved – одобрена, но не оформлена.
  // Active – действующая (выплачиваемая).
  // Paid – полностью выплачена.
  // Denied – отказано.
  // Canceled – отменена.

  const handleCardClick = useCallback(
    (e) => {
      e.preventDefault();
      if (['Offerred', 'IncompleteProfile', 'DocumentsRequired'].includes(status)) {
        navigate(`/r/${id}`);
      } else {
        navigate(`/pay/${id}`);
      }
    },
    [status, id]
  );

  const statusData = useMemo(() => {
    let text = status;
    let cn = '';

    if (['Offerred', 'Approving', 'IncompleteProfile', 'DocumentsRequired'].includes(status)) {
      cn = st._orange;
    }
    if (['Approved', 'Active', 'Paid'].includes(status)) {
      cn = st._green;
    }
    if (['Denied', 'Canceled'].includes(status)) {
      cn = st._red;
    }
    // switch (status) {
    //   case 'DocumentsRequired':
    //     // text = t('status.pending');
    //     cn = st._orange;
    //     break;
    //   case 'Approving':
    //     // text = t('status.processing');
    //     cn = st._green;
    //     break;
    //   case 3:
    //     // text = t('status.error');
    //     cn = st._red;
    //     break;

    //   default:
    //     break;
    // }

    return {
      text,
      cn,
    };
  }, [status]);

  const linkUrl = useMemo(() => {
    return `${isShopCard ? '/shop' : '/pay'}/${id}`;
  }, [id, isShopCard]);

  return (
    <a href={linkUrl} onClick={handleCardClick} className={cns(st.card, className)}>
      <div className={st.cardLeft}>
        <div className={st.cardRadial}>
          <CircularProgressbar
            strokeWidth={10}
            value={progress}
            maxValue={1}
            styles={radialStyle}
          />
          <div className={st.cardLogo}>
            {partner.logoSlug && <ApiImage slug={partner.logoSlug} width={80} />}
          </div>
        </div>
      </div>

      <div className={st.cardContent}>
        <div className={st.cardTitle}>{partner.name}</div>
        {description && <div className={st.cardDescription}>{description}</div>}
        {status && <div className={cns(st.cardStatus, statusData.cn)}>{statusData.text}</div>}
      </div>

      {!isShopCard && (
        <div className={st.cardMeta}>
          <div className={st.cardMetaPrimary}>{formatPrice(sumPaid)} ₽</div>
          <div className={st.cardMetaSecondary}>из {formatPrice(sum)} ₽</div>
        </div>
      )}
    </a>
  );
};

export default ShopCard;
