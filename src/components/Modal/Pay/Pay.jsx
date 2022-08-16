import React, { useContext, useState, useCallback, useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Modal, Input, Button, Checkbox } from '@ui';
import { UiStoreContext } from '@store';
import st from './Pay.module.scss';

const ModalPay = ({ className }) => {
  const [units, setUnits] = useState('');
  const [checkedSubscribe, setCheckedSubscribe] = useState(true);
  const [loading, setLoading] = useState(false);

  const uiContext = useContext(UiStoreContext);

  return (
    <Modal name="pay" className={className}>
      <div className={st.header}>
        Please provide your details and submit them before the event date, and we will send you an
        invitation link.
      </div>
    </Modal>
  );
};

export default ModalPay;
