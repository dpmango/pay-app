import React from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';

import Header from '@c/Layout/Header';

import st from './Layout.module.scss';

const Variants = {
  MAIN: 'main',
};

const VariantClasses = {
  [Variants.MAIN]: '',
};

const Layout = ({ variant, children }) => {
  return (
    <div className={cns(st.layout, variant && VariantClasses[variant])}>
      <Header className={st.header} />

      <main className={st.main}>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Layout.defaultProps = {
  variant: Variants.SIMPLE,
};

export default Layout;
