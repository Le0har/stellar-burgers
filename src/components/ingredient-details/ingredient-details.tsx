import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { selectIngredients } from '../../services/slices/ingredient-slice';

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  const { ingredients, loading, error } = useSelector(selectIngredients);

  let ingredientData = null;

  ingredients.forEach((ingredient) => {
    if (ingredient._id == id) {
      ingredientData = ingredient;
    }
  });

  if (!ingredientData) {
    return <Preloader />;
  }

  if (!loading && error) {
    return <p className='error'>Ошибка: {error}</p>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
