import React, { useContext, useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { useTranslation } from 'react-i18next';
import 'react-phone-number-input/style.css';

import { Button, Input } from '@ui';
import { SessionStoreContext } from '@store';

import st from './Phone.module.scss';

const formInitial = {
  phone: '',
};

const Phone = observer(({ tab, className }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('auth', { keyPrefix: 'phone' });

  const sessionContext = useContext(SessionStoreContext);

  const handleValidation = (values) => {
    const errors = {};
    if (!values.phone) {
      errors.phone = t('validation.empty');
    } else if (!isValidPhoneNumber(values.phone)) {
      errors.phone = t('validation.mask');
    }

    return errors;
  };

  const handleSubmit = useCallback(
    async (values, { resetForm }) => {
      if (loading) {
        return;
      }

      setLoading(true);
      await sessionContext
        .createSession({
          method: 'PhoneOTP',
          phone: values.phone.replace('+', ''),
        })
        .catch((err) => {
          setError(err.message);
        });
      setLoading(false);
    },
    [loading]
  );

  return (
    <section className={cns(st.container, className)}>
      <Formik
        initialValues={formInitial}
        validateOnChange={false}
        validate={handleValidation}
        onSubmit={handleSubmit}>
        {({ isValid, touched, isSubmitting, setFieldError }) => (
          <Form className={st.form}>
            <div className={cns(st.formBody)}>
              <div className={st.title}>{t('title')}</div>
              <Field type="text" name="phone">
                {({ field, form: { setFieldValue }, meta }) => (
                  <PhoneInput
                    initialValueFormat="national"
                    countryCallingCodeEditable={false}
                    defaultCountry="RU"
                    value={field.value}
                    onChange={(v) => {
                      setFieldValue(field.name, v);
                      setFieldError(field.name);
                    }}
                  />

                  // <Input
                  //   placeholder="+ 7"
                  //   mask="+ 7 999 999 99 99"
                  //   variant="small"
                  //   value={field.value}
                  //   error={meta.touched && meta.error}
                  //   onChange={(v) => {
                  //     setFieldValue(field.name, v);
                  //     setFieldError(field.name);
                  //   }}
                  // />
                )}
              </Field>
            </div>

            <div className={st.cta}>
              <Button loading={loading} type="submit" disabled={touched && !isValid} block>
                {t('submit')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
});

export default Phone;
