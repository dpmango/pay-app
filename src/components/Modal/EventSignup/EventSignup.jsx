import React, { useContext, useState, useCallback, useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Modal, Input, Button, Checkbox } from '@ui';
import { UiStoreContext } from '@store';
import styles from './EventSignup.module.scss';

const formInitial = {
  name: '',
  surname: '',
  email: '',
};

const EventSignup = ({ className }) => {
  const [units, setUnits] = useState('');
  const [checkedSubscribe, setCheckedSubscribe] = useState(true);
  const [loading, setLoading] = useState(false);

  const uiContext = useContext(UiStoreContext);

  const handleValidation = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Please enter your name';
    } else if (!values.surname) {
      errors.surname = 'Please enter your last name';
    } else if (!values.email) {
      errors.email = 'Please enter your email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Please enter a valid email';
    }
    return errors;
  };

  const handleSubmit = useCallback(
    async (values, { resetForm }) => {
      if (loading) {
        return;
      }

      setLoading(true);

      let data = {};
      data.first_name = values.name;
      data.last_name = values.surname;
      data.full_name = values.name + ' ' + values.surname;
      data.email = values.email;
      data.units = units;
      data.subscribe = 'yes';

      const body = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
      fetch(url, body).then((data) => {
        setUnits('');
        uiContext.setModal('eventSignupThanks');
        setLoading(false);
      });
    },
    [units]
  );

  return (
    <>
      <Modal name="eventSignup" className={className}>
        <div className={styles.header}>
          Please provide your details and submit them before the event date, and we will send you an invitation link.
        </div>

        <Formik
          initialValues={formInitial}
          validateOnChange={false}
          validate={handleValidation}
          onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldError }) => (
            <Form>
              <div className={styles.formMain}>
                <Field type="text" name="name">
                  {({ field, form: { setFieldValue }, meta }) => (
                    <Input
                      label="First name"
                      placeholder=""
                      value={field.value}
                      error={meta.touched && meta.error}
                      onChange={(v) => {
                        setFieldValue(field.name, v);
                        setFieldError(field.name);
                      }}
                    />
                  )}
                </Field>
                <Field type="text" name="surname">
                  {({ field, form: { setFieldValue }, meta }) => (
                    <Input
                      label="Last name"
                      placeholder=""
                      value={field.value}
                      error={meta.touched && meta.error}
                      onChange={(v) => {
                        setFieldValue(field.name, v);
                        setFieldError(field.name);
                      }}
                    />
                  )}
                </Field>
                <Field type="text" name="email">
                  {({ field, form: { setFieldValue }, meta }) => (
                    <Input
                      label="Email address"
                      type="text"
                      placeholder=""
                      value={field.value}
                      error={meta.touched && meta.error}
                      onChange={(v) => {
                        setFieldValue(field.name, v);
                        setFieldError(field.name);
                      }}
                    />
                  )}
                </Field>
              </div>

              <div className={styles.units}>
                <div className={styles.unitsRow}>
                  <Checkbox isChecked={units === '0'} onChange={() => setUnits('0')} type="radio" name="investUnits">
                    Just curious
                  </Checkbox>
                  <Checkbox isChecked={units === '1'} onChange={() => setUnits('1')} type="radio" name="investUnits">
                    1 Unit
                  </Checkbox>
                  <Checkbox isChecked={units === '2'} onChange={() => setUnits('2')} type="radio" name="investUnits">
                    2 Units
                  </Checkbox>
                  <Checkbox isChecked={units === '3'} onChange={() => setUnits('3')} type="radio" name="investUnits">
                    3 Units
                  </Checkbox>
                  <Checkbox isChecked={units === '4'} onChange={() => setUnits('4')} type="radio" name="investUnits">
                    4 Units
                  </Checkbox>
                  <Checkbox isChecked={units === '5'} onChange={() => setUnits('5')} type="radio" name="investUnits">
                    5 Units
                  </Checkbox>
                  <Checkbox isChecked={units === '6'} onChange={() => setUnits('6')} type="radio" name="investUnits">
                    More than 6 Units
                  </Checkbox>
                </div>
              </div>

              <div className={styles.checkbox}>
                <Checkbox isChecked={checkedSubscribe} onChange={() => setCheckedSubscribe(!checkedSubscribe)}>
                  Would you like to receive future emails with updates on Cayman based investment opportunities?
                </Checkbox>
              </div>

              <div className={styles.cta}>
                <Button type="submit">Submit</Button>
                <p>All fields are mandatory.</p>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal name="eventSignupThanks" variant="narrow" className={className}>
        <div className={styles.thanksText}>
          Thank you for you submission. Should you wish to participate, a PPM will be sent to you 24 hours before the
          event.
        </div>
      </Modal>
    </>
  );
};

export default EventSignup;
