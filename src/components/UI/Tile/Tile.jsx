import React, { memo } from 'react';
import cns from 'classnames';

import { SvgIcon, Image } from '@ui';

import st from './Tile.module.scss';

const Tile = ({ title, description, icon, image, clickable, isSocial, className, ...props }) => {
  return (
    <>
      <div className={cns(st.tile, clickable && st._clickable, isSocial && st._social, className)} {...props}>
        <div className={st.tileMedia}>
          {icon && <SvgIcon name={icon} clearColors={!isSocial} />}
          {image && <Image src={image} have2x={true} />}
        </div>
        <div className={st.tileContent}>
          <div className={st.tileTitle}>{title}</div>
          <div className={st.tileDescription}>{description}</div>
        </div>
      </div>
    </>
  );
};

export default memo(Tile);
