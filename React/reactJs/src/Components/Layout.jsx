import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingCompilerButton from './FloatingCompilerButton';

function Layout() {
  const location = useLocation();
  
  // Show footer only on Home and Login pages
  const showFooter = location.pathname === '/' || location.pathname === '/login';
  
  // Show floating compiler button on all pages except compiler page
  const showFloatingButton = !location.pathname.includes('/compiler');

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      {/* Add padding-top to account for fixed navbar */}
      <main className="pt-16">
        <Outlet />
      </main>
      {showFooter && <Footer/>}
      {showFloatingButton && <FloatingCompilerButton />}
    </div>
  );
}

export default Layout;
