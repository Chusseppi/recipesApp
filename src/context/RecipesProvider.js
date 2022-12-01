import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [initialRecipes, setInitialRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  const value = useMemo(
    () => ({
      data,
      setData,
      newData,
      setNewData,
      initialRecipes,
      setInitialRecipes,
      categories,
      setCategories,
      categoryFilter,
      setCategoryFilter,
    }),
    [
      data,
      setData,
      newData,
      setNewData,
      initialRecipes,
      setInitialRecipes,
      categories, setCategories, categoryFilter, setCategoryFilter,
    ],
  );
  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default RecipesProvider;