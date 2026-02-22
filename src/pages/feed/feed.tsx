import { useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFeeds, getFeeds } from '../../services/slices/feed-slice';
import { AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const { orders, loading, error } = useSelector(selectFeeds);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (loading && orders.length === 0) {
    return <Preloader />;
  }

  if (!loading && error) {
    return <p className='error'>Запрос завершился с ошибкой: {error}</p>;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
