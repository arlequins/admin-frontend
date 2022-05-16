import { useEffect } from 'react';

import { fetchDashboardListAsync } from '@app/features/dashboard/dashboard.slice';
import { useLocationState } from '@app/hooks/locations';
import { useAppDispatch, useAppSelector } from '@app/hooks/store';

const DashboardPage = () => {
  const { location, from, reason, match } = useLocationState();
  const { list, status } = useAppSelector(state => state.dashboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDashboardListAsync({}));
  }, [dispatch]);

  return (
    <>
      <section>
        <p>You redirectd from {from}</p>
        <p>reason: {reason}</p>
        <h3>{location.pathname}</h3>
        <h3>route pattern - {JSON.stringify(match?.pattern)}</h3>
        <h3>Protected - {location.pathname}</h3>
      </section>
      <section>
        <article>
          <h3>redux store list</h3>
          <h4>list - loop</h4>
          <p>status: {status}</p>
          {list.map((obj, key) => (
            <div key={key}>
              {key} - {obj.name}
            </div>
          ))}
        </article>
      </section>
    </>
  );
};

export default DashboardPage;
