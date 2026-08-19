import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that ensures the window scrolls to the top (0, 0)
 * every time a user navigates to a new route.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset window and document scroll immediately on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
