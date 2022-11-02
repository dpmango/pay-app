import React from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';

import Header from '@c/Layout/Header';
import HeaderSimple from '@c/Layout/HeaderSimple';

import st from './Layout.module.scss';

const Variants = {
  MAIN: 'main',
  CLEAR: 'clear',
  EMPTY: 'empty',
};

const VariantClasses = {
  [Variants.MAIN]: '',
  [Variants.CLEAR]: st._clear,
  [Variants.EMPTY]: st._empty,
};

const Layout = ({ variant, children }) => {
  return (
    <div className={cns(st.layout, variant && VariantClasses[variant])}>
      {variant === Variants.MAIN && <Header className={st.header} />}
      {variant === Variants.CLEAR && <HeaderSimple />}

      <main className={st.main}>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Layout.defaultProps = {
  variant: Variants.MAIN,
};

export default Layout;
