import React, { useContext, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Trans, useTranslation } from 'react-i18next';
import cns from 'classnames';
import QRCode from 'react-qr-code';

import { Button, Input, Spinner, Image, ApiImage } from '@ui';
import { PayoutStoreContext } from '@store';
import { isMobile, openExternalLink } from '@utils';

import st from './SBP.module.scss';

const SBP = observer(({ className }) => {
  const [search, setSearch] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);
  const payoutContext = useContext(PayoutStoreContext);
  const { payout, sbpList } = payoutContext;

  const { t } = useTranslation('pay', { keyPrefix: 'sbp' });
  const navigate = useNavigate();

  const handleBankSelect = useCallback(
    async (bank) => {
      if (isMobile()) {
        openExternalLink(bank.url);
      } else {
        setSelectedBank({ ...bank });
      }
    },
    [payout.id]
  );

  const searchedList = useMemo(() => {
    if (search.trim().length) {
      return sbpList.filter((x) => x.title.toLowerCase().includes(search.trim().toLowerCase()));
    }

    return sbpList;
  }, [sbpList, search]);

  const handleDefaultBank = () => {};

  if (sbpList.length === 0) {
    return <Spinner />;
  }

  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        {!selectedBank ? (
          <div className={st.wrapper}>
            <div className={st.head}>
              <Image src="/img/sbp.png" have2x={true} />
              <div className={st.description}>
                <Trans t={t} i18nKey={'description'} />
              </div>
            </div>

            <div className={st.search}>
              <Input
                placeholder={t('search')}
                icon="search"
                variant="small"
                value={search}
                onChange={(v) => {
                  setSearch(v);
                }}
              />
            </div>
            <div className={st.grid}>
              {searchedList.map((x, idx) => (
                <div className={st.bank} key={idx} onClick={() => handleBankSelect(x)}>
                  <div className={st.bankImage}>
                    <ApiImage slug={x.iconSlug} width={100} />
                  </div>

                  <div className={st.bankTitle}>{x.title}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={st.qrWrapper}>
            <div className={st.qrTitle}>{t('qr')}</div>
            <div className={st.qrImage}>
              <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%' }}
                value={selectedBank.url}
                viewBox={'0 0 256 256'}
              />
            </div>
            <div className={st.qrBank}>
              <ApiImage slug={selectedBank.iconSlug} />
              <p>{selectedBank.title}</p>
            </div>
          </div>
        )}

        {!selectedBank && (
          <div className={st.cta}>
            <Button block variant="small" onClick={handleDefaultBank}>
              {t('action')}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
});

export default SBP;
