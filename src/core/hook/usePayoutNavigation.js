import { useCallback } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const usePayoutNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigatePayoutByStatus = useCallback(
    ({ status, id }) => {
      let newPath = `/r/${id}`;

      if (status === 'Offerred') {
        newPath = `/r/${id}`;
      } else if (status === 'IncompleteProfile') {
        newPath = `/pay/${id}/profile`;
      } else if (status === 'DocumentsRequired') {
        newPath = `/pay/${id}/validation`;
      } else if (status === 'Approving') {
        newPath = `/pay/${id}/approving`;
      } else {
        newPath = `/pay/${id}`;
      }

      if (location.pathname !== newPath) {
        navigate(newPath);
      }
    },
    [location]
  );

  return {
    navigatePayoutByStatus,
  };
};
