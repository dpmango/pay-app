import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import cns from 'classnames';

import { SvgIcon, Spinner } from '@ui';
import st from './Button.module.scss';

const Themes = {
  PRIMARY: 'primary',
  ACCENT: 'accent',
  BLUE: 'blue',
  BLACK: 'black',
};

const Variants = {
  DEFAULT: 'default',
  SMALL: 'small',
  BIG: 'big',
};

const ThemeClasses = {
  [Themes.PRIMARY]: st._primary,
  [Themes.ACCENT]: st._accent,
  [Themes.BLUE]: st._blue,
  [Themes.BLACK]: st._black,
};

const VariantClasses = {
  [Variants.DEFAULT]: null,
  [Variants.SMALL]: st._small,
  [Variants.BIG]: st._big,
};

const Button = ({
  children,
  className,
  theme,
  variant,
  type,
  outline,
  block,
  loading,
  iconLeft,
  iconRight,
  ...props
}) => {
  const classStyle = cns(
    st.btn,
    theme && ThemeClasses[theme],
    variant && VariantClasses[variant],
    outline && st._outline,
    block && st._block,
    (iconLeft || iconRight) && st._iconed,
    loading && st._loading,
    iconLeft && st._iconLeft,
    iconRight && st._iconRight,
    className,
    'btn'
  );

  if (type === 'link') {
    return (
      <Link className={classStyle} {...props}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={classStyle} type={type || 'button'} {...props}>
        {iconLeft && <SvgIcon name={iconLeft} />}

        {children}

        {loading && <Spinner theme="button" color="#FFF" />}

        {iconRight && <SvgIcon name={iconRight} />}
      </button>
    );
  }
};

Button.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  outline: PropTypes.bool,
  block: PropTypes.bool,
  loading: PropTypes.bool,
  iconRight: PropTypes.string,
  iconLeft: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Button.defaultProps = {
  theme: Themes.PRIMARY,
  variant: Variants.DEFAULT,
};

export default memo(Button);
