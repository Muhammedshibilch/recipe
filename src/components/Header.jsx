import React from 'react';
import j1 from '../assets/j1.png';
import { searchRecipes } from '../redux/slice/recipesSlice'; // Ensure this path is correct
import { useDispatch } from 'react-redux';

const Header = ({ insideHome }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div 
        style={{ 
          backgroundColor: 'yellow', 
          height: '70px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '0 20px' 
        }} 
        className='w-100'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={j1} 
            width='100px' 
            height='80px' 
            className='ms-5' 
            alt='Logo' />
          <h1 style={{ marginLeft: '20px' }}>Recipes</h1>
        </div>
        {insideHome && 
          <input 
            type="text" 
            placeholder="Search recipe" 
            onChange={e => dispatch(searchRecipes(e.target.value.toLowerCase()))} 
            className='rounded' 
            style={{ 
              height: '40px', 
              width: '400px' 
            }} 
          />}
      </div>
    </div>
  );
}

export default Header;
