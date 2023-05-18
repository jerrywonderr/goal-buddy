import { Outlet } from 'react-router-dom';
import Header from './lib/components/Header';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
