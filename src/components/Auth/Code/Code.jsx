import React, { useContext, useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import cns from 'classnames';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Button, CodeInput } from '@ui';
import { SessionStoreContext } from '@store';

import st from './Code.module.scss';

const formInitial = {
  code: '',
};

const Code = observer(({ tab, className }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sessionContext = useContext(SessionStoreContext);
  const navigate = useNavigate();

  const handleValidation = (values) => {
    const errors = {};

    if (!values.code) {
      errors.code = 'Введите код';
    } else if (values.code.length !== 4) {
      errors.code = 'Введите 4 цифры';
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
        .confirmSession({
          code: values.code,
        })
        .then(() => {
          navigate('/', { replace: true });
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
              <div className={st.title}>Пожалуйста введите код из СМС</div>
              <div className={st.desc}>
                На ваш номер телефона <span className="c-primary">{sessionContext.phone}</span>{' '}
                отправлена смс с кодом
              </div>
              <Field type="text" name="code">
                {({ field, form: { setFieldValue }, meta }) => (
                  <CodeInput
                    length={4}
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

            <div className={st.cta}>
              <Button loading={loading} type="submit" disabled={!isValid} block>
                Отправить
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
});

export default Code;
