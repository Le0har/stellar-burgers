import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectConstructorItems,
  constructorActions
} from '../../services/slices/constructor-slice';
import {
  selectCreateOrder,
  createOrder,
  orderActions
} from '../../services/slices/order-slice';
import { selectUser } from '../../services/slices/user-slice';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { AppDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const { bun, ingredients } = useSelector(selectConstructorItems);

  const dispatch = useDispatch<AppDispatch>();

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const { order, loading, error } = useSelector(selectCreateOrder);
  const orderRequest = loading;
  const orderModalData = order;

  const { user } = useSelector(selectUser);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    let ingredientsId = [];
    ingredientsId.push(constructorItems.bun._id);
    constructorItems.ingredients.forEach((ingredient) => {
      ingredientsId.push(ingredient._id);
    });
    ingredientsId.push(constructorItems.bun._id);

    dispatch(createOrder(ingredientsId));
  };

  const closeOrderModal = () => {
    dispatch(orderActions.clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  if (error) {
    return (
      <p className='error'>Оформление заказа завершилось с ошибкой: {error}</p>
    );
  }

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
