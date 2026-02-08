import { FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { AppDispatch } from '../../services/store';
import { constructorActions } from '../../services/slices/constructor-slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleMoveDown = () => {
      dispatch(
        constructorActions.moveIngredient({
          fromIndex: index,
          toIndex: index + 1
        })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        constructorActions.moveIngredient({
          fromIndex: index,
          toIndex: index - 1
        })
      );
    };

    const handleClose = () => {
      dispatch(constructorActions.removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
