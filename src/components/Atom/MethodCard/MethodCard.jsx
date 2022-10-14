import React from 'react';
import cns from 'classnames';

import { SvgIcon, Image, ApiImage } from '@ui';
import { MethodImage } from '@c/Atom';
import st from './MethodCard.module.scss';

const MethodCard = ({ className, id, title, status, iconSlug, isActive, onSelect }) => {
  return (
    <div className={cns(st.payment, isActive && st._active)} onClick={() => onSelect(id)}>
      <MethodImage iconSlug={iconSlug} className={st.paymentImage} />

      <div className={st.paymentTitle}>{title}</div>
      <div className={st.paymentCheckbox}>
        <SvgIcon name="checkmark" />
      </div>
    </div>
  );
};

export default MethodCard;
