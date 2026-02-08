import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectProfileOrders,
  getOrders
} from '../../services/slices/profile-orders-slice';
import { AppDispatch } from '../../services/store';
import { selectUser } from '../../services/slices/user-slice';

export const ProfileOrders: FC = () => {
  const { user } = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  const { orders, loading, error } = useSelector(selectProfileOrders);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user) {
      dispatch(getOrders());
    }
  }, [dispatch, user]);

  if (loading && orders.length === 0) {
    return <Preloader />;
  }

  if (!loading && error) {
    return <p className='error'>Запрос завершился с ошибкой: {error}</p>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
