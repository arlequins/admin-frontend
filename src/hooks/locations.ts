import { useLocation, useMatch } from 'react-router-dom';

import { RedirectEnum } from '@app/types/typings/app/index.types';

export const useLocationState = () => {
  const location = useLocation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state = location.state as any;
  const from = state?.from?.pathname || '/';
  const reason = state?.reason || '';

  const match = useMatch(location.pathname);

  const setRedirectLocation = (reason?: RedirectEnum) => ({ from: location, reason: reason ?? RedirectEnum.REDIRECT });

  return { location, from, reason, match, setRedirectLocation };
};
