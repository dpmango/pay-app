import React, { useCallback, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import { SvgIcon, Button, ApiImage, Spinner } from '@ui';
import { PayoutStoreContext } from '@store';
import { formatPrice } from '@utils';

import st from './Order.module.scss';

const Order = observer(({ className, defaultOpen }) => {
  const [opened, setOpened] = useState(defaultOpen || false);
  const [activeDropDown, setActiveDropDown] = useState(null);

  const { payout } = useContext(PayoutStoreContext);
  const { t } = useTranslation('pay', { keyPrefix: 'order' });

  const handleDropdownCLick = useCallback(
    (id) => {
      let targetId = activeDropDown === id ? null : id;

      setActiveDropDown(targetId);
    },
    [activeDropDown]
  );

  if (!Object.keys(payout).length) {
    return <Spinner />;
  }

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={cns(st.box, opened && st._opened)}>
          <div className={st.boxHead} onClick={() => setOpened(!opened)}>
            <div className={st.boxHeadTitle}>{payout.description}</div>
            <SvgIcon name="caret" />
          </div>
          {opened && (
            <div className={st.boxContent}>
              <div className={st.content}>
                <div className={st.contentSection}>
                  <div className={st.contentHead}>
                    <div className={st.contentLogo}>
                      <ApiImage slug={payout.partner.logoSlug} width={80} />
                    </div>
                    <div className={st.contentHeadTitle}>{payout.partner.name}</div>
                  </div>
                  <div className={st.table}>
                    {payout.document.headers &&
                      payout.document.headers.map((row, idx) => (
                        <div className={st.tableRow} key={idx}>
                          <div className={st.tableLabel}>{row.title} </div>
                          <div className={st.tableValue}>{row.value}</div>
                        </div>
                      ))}
                  </div>
                </div>

                {payout.document.sections &&
                  payout.document.sections.map((section, idx) => (
                    <div
                      key={idx}
                      className={cns(
                        st.contentSection,
                        st._toggle,
                        activeDropDown === idx && st._active
                      )}>
                      <div className={st.contentRow} onClick={() => handleDropdownCLick(idx)}>
                        <div className={st.contentLabel}>{section.title}</div>
                        <div className={st.contentValue}>? ₽</div>
                        <div className={st.contentToggle}>
                          <SvgIcon name="caret" />
                        </div>
                      </div>
                      <div className={st.contentDropdown}>
                        <table className={st.table2}>
                          <thead>
                            <tr>
                              <td>№</td>
                              <td>{t('table.name')}</td>
                              <td>{t('table.amount')}</td>
                              <td>{t('table.price')}</td>
                              <td>{t('table.sum')}</td>
                            </tr>
                          </thead>
                          <tbody>
                            {section.items &&
                              section.items.map((item, idxx) => (
                                <tr key={idxx}>
                                  <td className={st.number}>{idxx + 1}</td>
                                  <td className={st.title}>
                                    {item.title} <small>{item.code}</small>
                                  </td>
                                  <td className={st.amount}>
                                    {item.quantity} {item.unit}
                                  </td>
                                  <td>{formatPrice(item.price)} ₽</td>
                                  <td>{formatPrice(item.total)} ₽</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}

                <div className={st.contentSection}>
                  <div className={cns(st.contentRow, st._primary)}>
                    <div className={cns(st.contentLabel)}>{t('total')}</div>
                    <div className={st.contentValue}>{formatPrice(payout.sum)} ₽</div>
                  </div>
                </div>

                <div className={st.contentDownload}>
                  <a href="/uploads/order.pdf" target="_blank" className={st.contentDownloadLink}>
                    <SvgIcon name="file-pdf" />
                    <span>{t('download')}</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

export default Order;
