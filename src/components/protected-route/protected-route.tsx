import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from 'react-redux';
import { selectUser } from '../../services/slices/user-slice';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const { user, loading } = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (onlyUnAuth && user) {
        navigate('/');
      } else if (!onlyUnAuth && !user) {
        navigate('/login');
      }
    }
  }, [user, loading, onlyUnAuth, navigate]);

  return children;
};
