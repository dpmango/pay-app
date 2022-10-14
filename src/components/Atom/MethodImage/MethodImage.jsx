import React from 'react';
import cns from 'classnames';

import { SvgIcon, Image, ApiImage } from '@ui';
import st from './MethodImage.module.scss';

const MethodImage = ({ iconSlug, className }) => {
  return (
    <div className={cns(st.image, className)}>
      {iconSlug === 'NewCard' && <SvgIcon name="add-card" />}
      {iconSlug === 'SBP' && <Image src="/img/payment/spb.png" />}
      {iconSlug && iconSlug.split('/').length > 1 && <ApiImage slug={iconSlug} width="45" />}

      {/* <Image src="/img/payment/mastercard.svg" /> */}
      {/* <Image src="/img/payment/visa.png" have2x={true} /> */}
    </div>
  );
};

export default MethodImage;
