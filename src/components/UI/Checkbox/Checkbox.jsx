import React, { useCallback, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';
import uniqueId from 'lodash/uniqueId';

import { SvgIcon } from '@ui';
import st from './Checkbox.module.scss';

const Checkbox = ({ className, isChecked, type, error, onChange, children, ...props }) => {
  const id = useMemo(() => {
    return uniqueId();
  }, []);

  const handleChange = useCallback(
    (e) => {
      if (onChange) {
        onChange();
      }
    },
    [onChange]
  );

  return (
    <div
      className={cns(
        'checkbox',
        st.checkbox,
        className,
        styles[type],
        isChecked && 'active',
        error && st._withError
      )}>
      <input id={id} type={type} className={cns(st.checkbox_input)} value={isChecked} {...props} />

      <label
        htmlFor={id}
        className={cns(st.checkbox_wrapper, 'checkbox_wrapper')}
        onClick={handleChange}>
        <div className={cns(st.checkbox_box, isChecked && st._isChecked)}>
          <SvgIcon name="checkmark" />
        </div>

        <div className={cns(st.checkbox_label, 'checkbox_label')}>{children}</div>
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  isChecked: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Checkbox.defaultProps = {
  type: 'checkbox',
};

export default memo(Checkbox);
