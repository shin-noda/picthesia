import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // For smooth scroll, you can also try
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); // 'auto' works too
    document.body.scrollTop = 0; // for Safari
    document.documentElement.scrollTop = 0; // for Chrome, Firefox, IE
  }, [pathname]);

  return null;
};

export default ScrollToTop;