import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { SvgIcon, Button } from '@ui';
import { UiStoreContext } from '@store';

import ProfileUpload from './Upload';
import st from './Validation.module.scss';

const Validation = observer(({ className }) => {
  const uiContext = useContext(UiStoreContext);

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.wrapper}>
          <div className={st.head}>
            <div className={st.headTitle}>Пожалуйста загрузите фото ваших документов</div>
            <div className={st.description}>
              Фото должно быть:
              <br />
              <br />
              светлым и четким (хорошее качество), необрезанным (видны все углы документа).
            </div>
          </div>

          <div className={st.grid}>
            <div className={st.col}>
              <ProfileUpload icon="upload-photo" title="Паспорт главный разворот" />
            </div>
            <div className={st.col}>
              <ProfileUpload icon="upload-photo" title="Паспорт прописка" />
            </div>
            <div className={cns(st.col, st._full)}>
              <ProfileUpload
                icon="upload-selfie"
                horizontal={true}
                title="Сделайте селфи с паспортом"
              />
            </div>
          </div>

          <div className={st.info}>
            <div className={st.description}>
              Должно быть четко видно фото в паспорте, ФИО и другие данные
            </div>
          </div>
        </div>

        <div className={st.cta}>
          <Button block>Отправить</Button>
          <div className={st.ctaLink}>Условия сервиса рассрочки</div>
        </div>
      </div>
    </section>
  );
});

export default Validation;
