import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { SvgIcon, Button, Image } from '@ui';
import { UiStoreContext } from '@store';

import st from './Scope.module.scss';

const radialStyle = buildStyles({
  pathTransitionDuration: 0.5,
  pathColor: '#34A8FF',
  trailColor: '#EBEAEA',
});

const Scope = observer(({ className }) => {
  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <section className={cns(st.container, className)}>
        <div className="container">
          <div className={st.radial}>
            <CircularProgressbar strokeWidth={6} value={0.5} maxValue={1} styles={radialStyle} />
            <div className={st.radialContent}>
              <div className={st.image}>
                <Image src="/img/logo-1.png" />
              </div>
              <div className={st.date}>23.05.22 14:17</div>
              <div className={st.title}>Заказ-наряд №15980</div>
              <div className={st.payments}>
                <div className={st.paymentsCol}>
                  <div className={st.paymentsValue}>8400 ₽</div>
                  <div className={st.paymentsDescription}>Общая сумма</div>
                </div>
                <div className={st.paymentsCol}>
                  <div className={st.paymentsValue}>4200 ₽</div>
                  <div className={st.paymentsDescription}>Осталось</div>
                </div>
              </div>
              <div className={st.deadline}>следующий платеж 11 июля</div>
            </div>
          </div>

          <div className={st.cta}>
            <Button block onClick={() => uiContext.setModal('pay')}>
              Оплатить сейчас
            </Button>
          </div>
        </div>
      </section>
    </>
  );
});

export default Scope;
