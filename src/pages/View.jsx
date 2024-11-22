import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';

const View = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (sessionStorage.getItem('allRecipes')) {
      const allRecipes = JSON.parse(sessionStorage.getItem('allRecipes'));
      setRecipe(allRecipes.find(item => item.id === parseInt(id)));
    }
  }, [id]);

  return (
    <>
      <Header />
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <h1 className='mt-3'>{recipe.name}</h1>
      </div>

      <div className='ms-4 mt-3 d-flex'>
        <img src={recipe.image} width={'300px'} height={'300px'} alt={recipe.name} />
        <div className='d-flex flex-column ms-2'>
          <h2><span>Instructions</span>:</h2>
          <p style={{textAlign: 'justify'}}>{recipe.instructions?.join(" ")}</p>
          <h3>Cuisine: {recipe.cuisine}</h3>
          <h3>Meal type: {recipe.mealType?.join(", ")}</h3>
          <h4>Prep Time: <span>{recipe.prepTimeMinutes} minutes</span></h4>
          <h4>Cook Time: <span>{recipe.cookTimeMinutes} minutes</span></h4>
          <h4>Servings: <span>{recipe.servings}</span></h4>
        </div>
      </div>
      <div className='mt-4'>
        <h3>Ingredients:</h3>
        <ul>
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default View;
