import React from 'react';
import cns from 'classnames';

import { SvgIcon, Image, ApiImage } from '@ui';

import st from './Empty.module.scss';

const Empty = ({ className, title }) => {
  return (
    <div className={cns(st.empty, className)}>
      <div className={st.emptyImage}>🦘</div>
      <p className={st.emptyText}>{title}</p>
    </div>
  );
};

export default Empty;
