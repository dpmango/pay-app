import React, { useCallback, useMemo, useState, memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';
import uniqueId from 'lodash/uniqueId';

import st from './CodeInput.module.scss';

const enLettersRegex = /^[a-zA-Z]+$/;

const CodeInput = ({
  className,
  label,
  length,
  value,
  allowLetters,
  onChange,
  error,
  showError,
  ...props
}) => {
  const [digits, setDigits] = useState(Array.from({ length }).fill(''));
  const inputRefs = useRef(Array.from({ length }));

  const id = useMemo(() => {
    return uniqueId();
  }, []);

  useEffect(() => {
    const valSplit = value.split('');
    setDigits(Array.from({ length }).map((_, idx) => valSplit[idx] || ''));
  }, [value, length]);

  const updateDigits = (index, value) => {
    if (!allowLetters && +value < 0 && +value > 9) {
      return;
    } else if (allowLetters && +value < 0 && +value > 9 && !enLettersRegex.test(value)) {
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = allowLetters ? value.toUpperCase() : value.replace(/[^\d]$/, '');

    if (onChange) {
      onChange(newDigits.join(''));
    }

    setDigits(newDigits);
  };

  const handleChangeDigits = useCallback(
    (event) => {
      const selectIndexDigit = event.target.dataset.index;
      const { value } = event.target;

      if (!selectIndexDigit) {
        return;
      }

      if (!allowLetters && isNaN(+value)) {
        return;
      } else if (allowLetters && isNaN(+value) && !enLettersRegex.test(value)) {
        return;
      }

      updateDigits(+selectIndexDigit, value);
      const inputs = inputRefs.current;

      if (+selectIndexDigit < inputs.length - 1) {
        inputs[+selectIndexDigit + 1].focus({ cursor: 'all' });
      } else if (+selectIndexDigit !== inputs.length - 1) {
        inputs[+selectIndexDigit].blur();
      }
    },
    [digits, inputRefs]
  );

  const handleKeyBackspace = useCallback(
    (event) => {
      const selectIndexDigit = +(event.currentTarget.dataset.index ?? 0);
      const keyPressed = event.nativeEvent.key;

      if (keyPressed !== 'Backspace') {
        return;
      }

      if (digits[selectIndexDigit]) {
        updateDigits(+selectIndexDigit, '');
      } else if (selectIndexDigit > 0) {
        updateDigits(+selectIndexDigit - 1, '');
        inputRefs.current[selectIndexDigit - 1].focus();
      }
    },
    [digits, inputRefs]
  );

  return (
    <div style={props.style} className={cns(st.input, className)}>
      {label && (
        <label className={st.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={cns(st.input_wrapper, error && st._withError)}>
        {digits.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            placeholder="0"
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            onKeyDown={handleKeyBackspace}
            onChange={handleChangeDigits}
            data-index={index}
            maxLength={1}
            className={cns(st.input_input)}
          />
        ))}
      </div>
      {error && showError && <div className={st.error}>{error}</div>}
    </div>
  );
};

CodeInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  length: PropTypes.number,
  value: PropTypes.string,
  allowLetters: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  showError: PropTypes.bool,
  onChange: PropTypes.func,
};

CodeInput.defaultProps = {
  showError: true,
};

export default memo(CodeInput);
