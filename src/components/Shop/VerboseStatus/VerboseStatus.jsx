import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import cns from 'classnames';

import st from './VerboseStatus.module.scss';

const VerboseStatus = ({ status, className }) => {
  const { t } = useTranslation('shop');

  // Offerred – предложена, но не оформлена.
  // Approving – на рассмотрении.
  // IncompleteProfile - требуется дозаполнение профиля.
  // DocumentsRequired - требуется догрузить документы.
  // Approved – одобрена, но не оформлена.
  // Active – действующая (выплачиваемая).
  // Paid – полностью выплачена.
  // Denied – отказано.
  // Canceled – отменена.

  const statusData = useMemo(() => {
    let text = status;
    let cn = '';

    switch (status) {
      case 'Offerred':
        text = t('status.offerred');
        cn = st._orange;
        break;
      case 'Approving':
        text = t('status.approving');
        cn = st._orange;
        break;
      case 'IncompleteProfile':
        text = t('status.incompleteprofile');
        cn = st._orange;
        break;
      case 'DocumentsRequired':
        text = t('status.docsrequired');
        cn = st._orange;
        break;
      case 'Approved':
        text = t('status.approved');
        cn = st._green;
        break;
      case 'Active':
        text = t('status.active');
        cn = st._green;
        break;
      case 'Paid':
        text = t('status.paid');
        cn = st._green;
        break;
      case 'Denied':
        text = t('status.denied');
        cn = st._red;
        break;
      case 'Canceled':
        text = t('status.canceled');
        cn = st._red;
        break;

      default:
        break;
    }

    return {
      text,
      cn,
    };
  }, [status]);

  return <span className={cns(statusData.cn, className)}>{statusData.text}</span>;
};

export default VerboseStatus;
