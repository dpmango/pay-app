import React, { useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { ApiImage } from '@ui';
import { formatPrice } from '@utils';

import VerboseStatus from '../VerboseStatus';
import st from './ShopCard.module.scss';

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

  const handleCardClick = useCallback(
    (e) => {
      e.preventDefault();
      if (status === 'Offerred') {
        navigate(`/r/${id}`);
      } else if (status === 'IncompleteProfile') {
        navigate(`/pay/${id}/profile`);
      } else if (status === 'DocumentsRequired') {
        navigate(`/pay/${id}/validation`);
      } else if (status === 'Approving') {
        navigate(`/pay/${id}/approving`);
      } else {
        navigate(`/pay/${id}`);
      }
    },
    [status, id]
  );

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
        {status && <VerboseStatus className={st.cardStatus} status={status} />}
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
