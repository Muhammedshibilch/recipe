import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../redux/slice/recipesSlice'; // Ensure the correct path

const Home = () => {
  const dispatch = useDispatch();
  const { allRecipes, loading, errorMsg } = useSelector(state => state.recipesReducer);

  useEffect(() => {
    const storedRecipes = sessionStorage.getItem('allRecipes');
    console.log('Stored Recipes:', storedRecipes); // Debug: Log stored recipes
    if (storedRecipes) {
      // Load recipes from sessionStorage
      dispatch({ type: 'recipes/fetchRecipes/fulfilled', payload: JSON.parse(storedRecipes) });
    } else {
      // Fetch recipes from API
      dispatch(fetchRecipes());
    }
  }, [dispatch]);

  useEffect(() => {
    console.log('All Recipes:', allRecipes); // Debug: Log all recipes state
  }, [allRecipes]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recipePerPage = 9;
  const totalPages = Math.ceil(allRecipes?.length / recipePerPage);
  const currentPageRecipeLastIndex = currentPage * recipePerPage;
  const currentPageRecipeFirstIndex = currentPageRecipeLastIndex - recipePerPage;
  const visibleAllRecipes = allRecipes?.slice(currentPageRecipeFirstIndex, currentPageRecipeLastIndex);

  const navigateToNxtPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const navigateToPrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Header insideHome={true} />
      <div style={{ padding: '100px' }} className='d-flex flex-wrap'>
        {loading && <div>Loading...</div>}
        {errorMsg && <div>Error: {errorMsg}</div>}
        {visibleAllRecipes && visibleAllRecipes.length > 0 ? (
          visibleAllRecipes.map(recipe => (
            <Card key={recipe.id} style={{ width: '18rem' }} className='mt-5 ms-5'>
              <Card.Img variant="top" style={{ height: '180px' }} src={recipe.image} />
              <Card.Body>
                <Card.Title>{recipe.name}</Card.Title>
                <Link
                  to={`/recipe/${recipe.id}/view`}
                  className="btn btn-primary mt-3 w-100"
                  style={{
                    background: "yellow",
                    color: "black",
                    border: "none",
                    borderRadius: "5px",
                    textDecoration: "none",
                    fontWeight: "bold"
                  }}
                >
                  View Details
                </Link>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div className="d-flex justify-content-center">
            <img src="https://th.bing.com/th/id/OIP.xD--Cxh0oSicdoQjFLckEQHaDt?w=340&h=174&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" />
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center">
        <span onClick={navigateToPrevPage} className='cursor-pointer'>
          <i className="fa-solid fa-backward me-5"></i>
        </span>
        <span>  {currentPage} of {totalPages} </span>
        <span onClick={navigateToNxtPage} className='cursor-pointer'>
          <i className="fa-solid fa-forward ms-5"></i>
        </span>
      </div>
    </>
  );
}

export default Home;
