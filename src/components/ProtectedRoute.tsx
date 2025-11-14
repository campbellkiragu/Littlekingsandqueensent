import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from './Router';
import { useToast } from './Toast';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { navigate } = useRouter();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (!loggedIn) {
      showToast('Please login first', 'error');
      navigate('/admin/login');
    }
    setIsLoggedIn(loggedIn);
    setIsLoading(false);
  }, [navigate, showToast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // already redirected
  }

  return <>{children}</>;
}
