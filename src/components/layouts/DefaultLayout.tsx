import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <article>
      <Outlet />
    </article>
  );
};

export default DefaultLayout;
