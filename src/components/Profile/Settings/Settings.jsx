import React, { useContext, useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import cns from 'classnames';

import { Button, Input } from '@ui';
import { Avatar } from '@c/Atom';
import { SessionStoreContext } from '@store';

import st from './Settings.module.scss';

const Settings = observer(({ asContinue, className }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sessionContext = useContext(SessionStoreContext);

  const { t } = useTranslation('profile', { keyPrefix: 'settings' });

  const location = useLocation();
  const navigate = useNavigate();

  const formInitial = {
    firstName: sessionContext.profile.firstName || '',
    lastName: sessionContext.profile.lastName || '',
    middleName: sessionContext.profile.middleName || '',
  };

  const handleValidation = (values) => {
    const errors = {};

    return errors;
  };

  const handleSubmit = useCallback(
    async (values, { resetForm }) => {
      if (loading) {
        return;
      }

      setLoading(true);
      const res = await sessionContext.updateProfile(values).catch((err) => {
        setError(err.message);
      });
      setLoading(false);

      if (res) {
        toast.success(t('toast'));
        let from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    },
    [loading]
  );

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        {!asContinue ? (
          <div className={st.head}>
            <Avatar variant="large" />
          </div>
        ) : (
          <div className={st.intro}>
            <p>Введите ваше ФИО</p>
          </div>
        )}

        <Formik
          initialValues={formInitial}
          validateOnChange={false}
          validate={handleValidation}
          onSubmit={handleSubmit}>
          {({ isValid, touched, isSubmitting, setFieldError }) => (
            <Form className={st.form}>
              <div className={cns(st.formBody)}>
                <Field type="text" name="firstName">
                  {({ field, form: { setFieldValue }, meta }) => (
                    <Input
                      label={!asContinue && t('name')}
                      placeholder={asContinue && t('name')}
                      variant="small"
                      className={st.formInput}
                      value={field.value}
                      error={meta.touched && meta.error}
                      onChange={(v) => {
                        setFieldValue(field.name, v);
                        setFieldError(field.name);
                      }}
                    />
                  )}
                </Field>

                <Field type="text" name="lastName">
                  {({ field, form: { setFieldValue }, meta }) => (
                    <Input
                      label={!asContinue && t('surname')}
                      placeholder={asContinue && t('surname')}
                      variant="small"
                      className={st.formInput}
                      value={field.value}
                      error={meta.touched && meta.error}
                      onChange={(v) => {
                        setFieldValue(field.name, v);
                        setFieldError(field.name);
                      }}
                    />
                  )}
                </Field>

                <Field type="text" name="middleName">
                  {({ field, form: { setFieldValue }, meta }) => (
                    <Input
                      label={!asContinue && t('patronymic')}
                      placeholder={asContinue && t('patronymic')}
                      variant="small"
                      className={st.formInput}
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
                <Button loading={loading} type="submit" disabled={touched && !isValid} block>
                  {asContinue ? t('continue') : t('save')}
                </Button>
                {asContinue && (
                  <div className={st.link}>
                    <a href="">{t('terms')}</a>
                  </div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
});

export default Settings;
