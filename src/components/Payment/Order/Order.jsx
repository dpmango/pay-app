import React, { useCallback, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { SvgIcon, Button, Image } from '@ui';
import { UiStoreContext } from '@store';

import st from './Order.module.scss';

const Order = observer(({ className }) => {
  const [opened, setOpened] = useState(false);
  const [activeDropDown, setActiveDropDown] = useState(null);

  const uiContext = useContext(UiStoreContext);

  const handleDropdownCLick = useCallback(
    (id) => {
      let targetId = activeDropDown === id ? null : id;

      setActiveDropDown(targetId);
    },
    [activeDropDown]
  );

  return (
    <>
      <section className={cns(st.container, className)}>
        <div className="container">
          <div className={cns(st.box, opened && st._opened)}>
            <div className={st.boxHead} onClick={() => setOpened(!opened)}>
              <div className={st.boxHeadTitle}>Заказ-наряд №15980 от 28.07.2022</div>
              <SvgIcon name="caret" />
            </div>
            {opened && (
              <div className={st.boxContent}>
                <div className={st.content}>
                  <div className={st.contentSection}>
                    <div className={st.contentHead}>
                      <div className={st.contentLogo}>
                        <Image src="/img/logo-1.png" have2x="" />
                      </div>
                      <div className={st.contentHeadTitle}>АВТОDOM</div>
                    </div>
                    <div className={st.table}>
                      <div className={st.tableRow}>
                        <div className={st.tableLabel}>Дилерский центр: </div>
                        <div className={st.tableValue}>Автодом Зорге</div>
                      </div>
                      <div className={st.tableRow}>
                        <div className={st.tableLabel}>Мастер-приемщик: </div>
                        <div className={st.tableValue}>Иванов В.В.</div>
                      </div>
                      <div className={st.tableRow}>
                        <div className={st.tableLabel}>Автомобиль: </div>
                        <div className={st.tableValue}>BMW X5 г.н. O111OO777</div>
                      </div>
                      <div className={st.tableRow}>
                        <div className={st.tableLabel}>VIN: </div>
                        <div className={st.tableValue}>ABCDE12345678</div>
                      </div>
                      <div className={st.tableRow}>
                        <div className={st.tableLabel}>Цель обращения: </div>
                        <div className={st.tableValue}>ТО №1 (10000км)</div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={cns(
                      st.contentSection,
                      st._toggle,
                      activeDropDown === 1 && st._active
                    )}>
                    <div className={st.contentRow} onClick={() => handleDropdownCLick(1)}>
                      <div className={st.contentLabel}>
                        Дополнительные работы по просьбе/желанию клиента
                      </div>
                      <div className={st.contentValue}>56 000 ₽</div>
                      <div className={st.contentToggle}>
                        <SvgIcon name="caret" />
                      </div>
                    </div>
                    <div className={st.contentDropdown}>
                      <table className={st.table2}>
                        <thead>
                          <tr>
                            <td>№</td>
                            <td>Название</td>
                            <td>Кол-во</td>
                            <td>Цена</td>
                            <td>Сумма</td>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>

                  <div
                    className={cns(
                      st.contentSection,
                      st._toggle,
                      activeDropDown === 2 && st._active
                    )}>
                    <div className={st.contentRow} onClick={() => handleDropdownCLick(2)}>
                      <div className={st.contentLabel}>
                        Работы по рекомендации
                        <br /> Сервиса
                      </div>
                      <div className={st.contentValue}>16 700 ₽</div>
                      <div className={st.contentToggle}>
                        <SvgIcon name="caret" />
                      </div>
                    </div>
                    <div className={st.contentDropdown}>
                      <table className={st.table2}>
                        <thead>
                          <tr>
                            <td>№</td>
                            <td>Название</td>
                            <td className="tar">Кол-во</td>
                            <td className="tar">Цена</td>
                            <td className="tar">Сумма</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className={st.number}>1</td>
                            <td className={st.title}>
                              Замена масла <small>4499239375702</small>
                            </td>
                            <td className={st.amount}>1,0</td>
                            <td>3 000 ₽</td>
                            <td>3 000 ₽</td>
                          </tr>
                          <tr>
                            <td className={st.number}>2</td>
                            <td className={st.title}>
                              Замена масляного фильтра <small>4499239375702</small>
                            </td>
                            <td className={st.amount}>1,0</td>
                            <td>3 000 ₽</td>
                            <td>3 000 ₽</td>
                          </tr>
                          <tr>
                            <td className={st.number}>3</td>
                            <td className={st.title}>
                              Замена масла <small>4499239375702</small>
                            </td>
                            <td className={st.amount}>1,0</td>
                            <td>3 000 ₽</td>
                            <td>3 000 ₽</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className={st.contentSection}>
                    <div className={cns(st.contentRow, st._primary)}>
                      <div className={cns(st.contentLabel)}>Общая сумма</div>
                      <div className={st.contentValue}>1200 ₽</div>
                    </div>
                  </div>

                  <div className={st.contentDownload}>
                    <a href="/uploads/order.pdf" target="_blank" className={st.contentDownloadLink}>
                      <SvgIcon name="file-pdf" />
                      <span>Скачать PDF</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
});

export default Order;
