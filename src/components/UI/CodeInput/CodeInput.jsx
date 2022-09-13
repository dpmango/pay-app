import React, { useCallback, useMemo, useState, memo } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';
import uniqueId from 'lodash/uniqueId';

import { SvgIcon, Image } from '@ui';
import st from './CodeInput.module.scss';
import { useEffect } from 'react';

const CodeInput = ({ className, label, length, value, onChange, error, showError, ...props }) => {
  const [fields, setFields] = useState([...new Array(length)]);

  const id = useMemo(() => {
    return uniqueId();
  }, []);

  const onKeyUp = useCallback(
    (e) => {
      const isValidNumber = (n) => Number.isFinite(Number(n));
      let newFields = fields;
      const curFields = fields.filter((x) => x).length;

      if (e.keyCode === 8) {
        if (curFields === 0) return;
        newFields[curFields - 1] = undefined;
        setFields([...newFields]);
      }

      if (isValidNumber(e.key)) {
        if (curFields >= length) return;

        newFields[curFields] = +e.key;
        setFields([...newFields]);
      }
    },
    [fields, length]
  );

  useEffect(() => {
    const stringCode = fields.filter((x) => x).join('');
    onChange(stringCode);
  }, [fields]);

  const inputProps = {
    id,
    className: cns(st.input_input, error && st._withError),
    value,
    onChange: () => {},
    onKeyUp: onKeyUp,
    ...props,
  };

  return (
    <div style={props.style} className={cns(st.input, className)}>
      {label && (
        <label className={st.label} htmlFor={id}>
          {label}
        </label>
      )}

      <div className={st.input_wrapper}>
        <input {...inputProps} />
        <div className={st.input_mask}>
          {fields.map((f, idx) => (
            <div className={st.input_maskCol} key={idx}>
              {f && <span className={st.input_maskValue}>{f}</span>}
              {!f && <span className={st.input_maskPlaceholder}>0</span>}
            </div>
          ))}
        </div>

        {error && showError && <div className={st.error}>{error}</div>}
      </div>
    </div>
  );
};

CodeInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  length: PropTypes.number,
  allowClear: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  showError: PropTypes.bool,
  onChange: PropTypes.func,
};

CodeInput.defaultProps = {
  showError: true,
};

export default memo(CodeInput);
