import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 font-sans antialiased">
      <Navbar isAuthPage={isAuthPage} />
      <main className="flex-1 pt-20 min-h-screen">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default Layout;
