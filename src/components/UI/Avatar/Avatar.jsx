import React, { memo } from 'react';
import cns from 'classnames';

import { SvgIcon } from '@ui';
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
  const empty = !img && !name;

  const classStyle = cns(
    st.avatar,
    variant && VariantClasses[variant],
    empty && st._empty,
    className
  );

  return (
    <div className={classStyle} {...props}>
      {img && <img className={st.img} alt={name} />}
      {name && <span className={st.name}>{name}</span>}
      {empty && (
        <span className={st.icon}>
          <SvgIcon name="user" />
        </span>
      )}
    </div>
  );
};

export default memo(Avatar);
