import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { SvgIcon, Button, Image } from '@ui';
import { UiStoreContext } from '@store';

import st from './Installment.module.scss';

const Installment = observer(({ className }) => {
  const [periods, setPeriods] = useState([3, 6, 9, 12]);
  const [selectedPeriod, setSelectedPeriod] = useState(6);

  const uiContext = useContext(UiStoreContext);

  return (
    <>
      <section className={cns(st.container, className)}>
        <div className="container">
          <div className={st.head}>
            <SvgIcon name="logo" />
            <span>оплатить в рассрочку</span>
          </div>

          <div className={st.payments}>
            <div className={st.payment}>
              <div className={st.paymentTitle}>56 000 ₽</div>
              <div className={st.paymentDesc}>Первый платеж</div>
            </div>
            <div className={st.payment}>
              <div className={st.paymentTitle}>4200 ₽</div>
              <div className={st.paymentDesc}>в месяц</div>
            </div>
          </div>

          <div className={st.monts}>
            {periods &&
              periods.map((period, idx) => (
                <div className={st.month} key={idx}>
                  <Button
                    theme={selectedPeriod === period ? 'blue' : 'green'}
                    block
                    onClick={() => setSelectedPeriod(period)}>
                    {period} мес
                  </Button>
                </div>
              ))}
          </div>

          <div className={st.cta}>
            <Button block onClick={() => {}}>
              Начать оформление
            </Button>
          </div>

          <div className={st.link}>
            <a href="">Условия сервиса рассрочки</a>
          </div>
        </div>
      </section>
    </>
  );
});

export default Installment;
