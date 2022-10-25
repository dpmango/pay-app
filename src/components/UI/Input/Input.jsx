import React, { useCallback, useMemo, useState, memo } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';
import uniqueId from 'lodash/uniqueId';
import InputMask from 'react-input-mask';

import { SvgIcon, Image } from '@ui';
import st from './Input.module.scss';

const Variants = {
  DEFAULT: 'default',
  SMALL: 'small',
};

const VariantClasses = {
  [Variants.DEFAULT]: null,
  [Variants.SMALL]: st._small,
};

const Input = ({
  className,
  label,
  icon,
  inputRef,
  variant,
  modifier,
  allowClear,
  value,
  onChange,
  mask,
  error,
  showError,
  cardNumber,
  children,
  ...props
}) => {
  const id = useMemo(() => {
    return uniqueId();
  }, []);

  const onInputChange = useCallback(
    (e) => {
      if (onChange) {
        onChange(e.target.value, e);
      }
    },
    [onChange]
  );

  const onCLearInput = useCallback(() => {
    if (onChange) {
      onChange('');
    }
  }, [onChange]);

  const clearIcon = useMemo(() => {
    if (allowClear && value) {
      return (
        <button type="button" onClick={onCLearInput} className={st.input_clear} title="Очистить">
          <SvgIcon name="close" />
        </button>
      );
    }

    return null;
  }, [value, allowClear]);

  const cardImage = useMemo(() => {
    if (!value) return null;

    if (Number(value.slice(0, 1)) === 4) {
      return '/img/payment/visa.png';
    } else if ([50, 56, 57, 58, 51, 52, 53, 54, 55].includes(Number(value.slice(0, 2)))) {
      return '/img/payment/mastercard.svg';
    }

    return null;
  }, [value]);

  const inputProps = {
    id,
    ref: inputRef,
    className: cns(
      st.input_input,
      icon && st._iconed,
      allowClear && st._withClear,
      error && st._withError
    ),
    value,
    onChange: onInputChange,
    ...props,
  };

  return (
    <div
      style={props.style}
      className={cns(
        st.input,
        variant && VariantClasses[variant],
        modifier && styles[`_${modifier}`],
        className
      )}>
      {label && (
        <label className={st.label} htmlFor={id}>
          {label}
        </label>
      )}

      <div className={cns(st.input_wrapper)}>
        {children}

        {icon && (
          <div className={st.icon}>
            <SvgIcon name={icon} />
          </div>
        )}

        {props.type === 'textarea' ? (
          <textarea {...inputProps} />
        ) : mask ? (
          <InputMask
            mask={mask}
            // beforeMaskedValueChange={beforeMaskedValueChange}
            {...inputProps}
          />
        ) : (
          <input {...inputProps} />
        )}

        {clearIcon}

        {cardNumber && cardImage && (
          <div className={st.cardImage}>
            <Image src={cardImage} />
          </div>
        )}

        {error && showError && <div className={st.error}>{error}</div>}
      </div>
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  allowClear: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  modifier: PropTypes.string,
  variant: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  showError: PropTypes.bool,
  onChange: PropTypes.func,
  mask: PropTypes.string,
  cardNumber: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Input.defaultProps = {
  variant: Variants.DEFAULT,
  showError: true,
};

export default memo(Input);
