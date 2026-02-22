import { combineReducers } from '@reduxjs/toolkit';
import ingredientReducer from './slices/ingredient-slice';
import constructorReducer from './slices/constructor-slice';
import orderReducer from './slices/order-slice';
import userReducer from './slices/user-slice';
import feedReducer from './slices/feed-slice';
import profileOrdersReducer from './slices/profile-orders-slice';

export const rootReducer = combineReducers({
  burgerIngredient: ingredientReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer
});
