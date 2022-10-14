import React, { useContext, useState, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Trans, useTranslation } from 'react-i18next';
import cns from 'classnames';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Modal, Input, Button, Image } from '@ui';
import { UiStoreContext } from '@store';
import st from './AddCard.module.scss';

const formInitial = {
  card: '',
  name: '',
  date: '',
  cvc: '',
};

const AddCard = observer(({ className }) => {
  const [loading, setLoading] = useState(false);
  const uiContext = useContext(UiStoreContext);
  const { t } = useTranslation('modalAddCard');

  const handleValidation = (values) => {
    const errors = {};
    if (!values.card || values.card.length !== 19) {
      errors.card = t('card.validation');
    } else if (!values.name) {
      errors.name = t('card.name');
    } else if (!values.date || values.date.length !== 5) {
      errors.date = t('card.date');
    } else if (!values.date || values.date.length !== 3) {
      errors.cvc = t('card.cvc');
    }
    return errors;
  };

  const handleSubmit = useCallback(async (values, { resetForm }) => {
    if (loading) {
      return;
    }

    uiContext.setModal('pay');
    // setLoading(true);

    let data = {};
  }, []);

  return (
    <Modal name="addCard" className={className}>
      <div className={st.title}>{t('title')}</div>

      <Formik
        initialValues={formInitial}
        validateOnChange={false}
        validate={handleValidation}
        onSubmit={handleSubmit}>
        {({ isSubmitting, setFieldError }) => (
          <Form className={st.form}>
            <div className={st.formRows}>
              <div className={cns(st.formCol, st._card)}>
                <Field type="text" name="card">
                  {({ field, form: { setFieldValue }, meta }) => (
                    <Input
                      label={t('card.label')}
                      placeholder="0000 0000 0000 0000"
                      mask="9999 9999 9999 9999"
                      autoComplete="cc-number"
                      value={field.value}
                      cardNumber={true}
                      error={meta.touched && meta.error}
                      onChange={(v) => {
                        setFieldValue(field.name, v);
                        setFieldError(field.name);
                      }}
                    />
                  )}
                </Field>
              </div>
              <div className={cns(st.formCol, st._name)}>
                <Field type="text" name="name">
                  {({ field, form: { setFieldValue }, meta }) => (
                    <Input
                      label={t('name.label')}
                      placeholder={t('name.placeholder')}
                      autoComplete="cc-name"
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
              <div className={cns(st.formCol, st._date)}>
                <Field type="text" name="date">
                  {({ field, form: { setFieldValue }, meta }) => (
                    <Input
                      label={t('date.label')}
                      placeholder="01/24"
                      mask="99/99"
                      autoComplete="cc-exp"
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
              <div className={st.formCol}>
                <div className={st.formCvv}>
                  <div className={st.formCvvLabel}>
                    <Trans t={t} i18nKey="cvc.label" />
                  </div>
                  <div className={st.formCvvInput}>
                    <Field type="text" name="cvc">
                      {({ field, form: { setFieldValue }, meta }) => (
                        <Input
                          placeholder=""
                          autoComplete="cc-cvc"
                          mask="999"
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
                </div>
              </div>
            </div>

            <div className={st.cta}>
              <Button type="submit" block>
                {t('action')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
});

export default AddCard;
