import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from './Router';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" />;
  }

  return <>{children}</>;
}
