import React, { memo } from 'react';
import cns from 'classnames';

import st from './Avatar.module.scss';

const Variants = {
  DEFAULT: 'default',
  SMALL: 'small',
  BIG: 'big',
};

const VariantClasses = {
  [Variants.DEFAULT]: st._default,
  [Variants.SMALL]: st._small,
  [Variants.BIG]: st._big,
};

const Avatar = ({ className, img, name, variant = 'default', ...props }) => {
  const classStyle = cns(st.avatar, variant && VariantClasses[variant], className);

  return (
    <div className={classStyle} {...props}>
      {img ? <img className={st.img} alt={name} /> : <span className={st.name}>{name}</span>}
    </div>
  );
};

export default memo(Avatar);
