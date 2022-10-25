import React, { memo, useState, useContext, useMemo, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';
import ClipLoader from 'react-spinners/ClipLoader';

import st from './Spinner.module.scss';

const Themes = {
  PRIMARY: 'primary',
  INLINE: 'inline',
  BUTTON: 'button',
};

const ThemeClasses = {
  [Themes.PRIMARY]: st._primary,
  [Themes.INLINE]: st._inline,
  [Themes.BUTTON]: st._button,
};

const Spinner = ({ className, theme, color, ...props }) => {
  return (
    <div className={cns(st.loader, theme && ThemeClasses[theme], className)}>
      <ClipLoader color={color || '#182D78'} loading={true} size={24} />
    </div>
  );
};

Spinner.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.string,
  color: PropTypes.string,
};

Spinner.defaultProps = {
  theme: Themes.PRIMARY,
};

export default memo(Spinner);
