import React, { useContext, useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Button, CodeInput } from '@ui';
import { secondsToStamp } from '@utils';
import { SessionStoreContext } from '@store';

import st from './Code.module.scss';

const formInitial = {
  code: '',
};

const Code = observer(({ tab, className }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('auth', { keyPrefix: 'code' });

  const sessionContext = useContext(SessionStoreContext);
  const { confirmation, phone } = useContext(SessionStoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const timerConfirm = useRef(null);
  const timerRetry = useRef(null);
  const [countdownConfirm, setCountdownConfirm] = useState(confirmation.confirmationTimeout);
  const [countdownRetry, setCountdownRetry] = useState(confirmation.retryTimeout);

  const handlePhoneChange = useCallback(() => {
    sessionContext.setPhone(null);
  }, []);

  const confirmDisabled = useMemo(() => {
    return countdownConfirm === 0;
  }, []);

  const handleValidation = (values) => {
    const errors = {};

    if (!values.code) {
      errors.code = t('validation.empty');
    } else if (values.code.length !== 4) {
      errors.code = t('validation.mask');
    }
    return errors;
  };

  const handleCodeResend = useCallback(async () => {
    const data = await sessionContext
      .createSession({
        method: 'PhoneOTP',
        phone: phone,
      })
      .catch((err) => {
        setError(err.message);
      });

    if (data) {
      const { confirmationTimeout, retryTimeout } = data;
      clearTimeout(timerConfirm.current);
      clearTimeout(timerRetry.current);
      setCountdownConfirm(confirmationTimeout);
      setCountdownRetry(retryTimeout);
    }
  }, [phone]);

  const handleSubmit = useCallback(
    async (values, { resetForm }) => {
      if (loading) {
        return;
      }

      setLoading(true);
      await sessionContext
        .confirmSession({
          code: values.code,
        })
        .then(() => {
          let from = location.state?.from?.pathname || '/';

          navigate(from, { replace: true });
        })
        .catch((err) => {
          setError(t('validation.wrong'));
          resetForm();
        });
      setLoading(false);
    },
    [loading]
  );

  useEffect(() => {
    if (countdownConfirm >= 1) {
      timerConfirm.current = setTimeout(() => {
        setCountdownConfirm((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timerConfirm.current);
    };
  }, [countdownConfirm]);

  useEffect(() => {
    if (countdownRetry >= 1) {
      timerRetry.current = setTimeout(() => {
        setCountdownRetry((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timerRetry.current);
    };
  }, [countdownRetry]);

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
              <div className={st.desc}>
                <p>
                  {t('description.number')}&nbsp;
                  <span className="c-primary">+{sessionContext.phone}</span>{' '}
                  {t('description.action')}
                </p>
                <p>
                  <a href="#" onClick={handlePhoneChange}>
                    {t('changePhone')}
                  </a>
                </p>
              </div>
              <Field type="text" name="code">
                {({ field, form: { setFieldValue }, meta }) => (
                  <CodeInput
                    length={4}
                    value={field.value}
                    error={error || (meta.touched && meta.error)}
                    onChange={(v) => {
                      setFieldValue(field.name, v);
                      setFieldError(field.name);
                      setError(false);
                    }}
                  />
                )}
              </Field>
              <p className={st.confirmTimeout}>
                {countdownConfirm === 0 ? (
                  <span>{t('confirmation.expired')}</span>
                ) : (
                  <span>
                    {t('confirmation.info')} {secondsToStamp(countdownConfirm)}
                  </span>
                )}
              </p>
            </div>

            <div className={st.cta}>
              <p className={st.confirmResend}>
                {countdownRetry === 0 ? (
                  <a href="#" onClick={handleCodeResend}>
                    {t('resend.action')}
                  </a>
                ) : (
                  <span>
                    {t('resend.info')} {secondsToStamp(countdownRetry)}
                  </span>
                )}
              </p>
              <Button loading={loading} type="submit" disabled={!isValid || confirmDisabled} block>
                {t('submit')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
});

export default Code;
