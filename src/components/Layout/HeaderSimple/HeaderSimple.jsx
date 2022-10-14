import React from 'react';
import { Link } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon } from '@ui';

import st from './HeaderSimple.module.scss';

const Header = ({ className }) => {
  return (
    <header className={cns(st.header, className)}>
      <div className="container">
        <div className={st.wrapper}>
          <Link to="/" className={st.logo}>
            <SvgIcon name="logo" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
