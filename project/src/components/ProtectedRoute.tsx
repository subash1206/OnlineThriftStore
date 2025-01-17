import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: Props) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}