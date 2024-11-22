import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch recipes and store in sessionStorage
export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const result = await axios.get('https://dummyjson.com/recipes');
  console.log('API Response:', result.data); // Debug: Log API response
  sessionStorage.setItem('allRecipes', JSON.stringify(result.data.recipes));
  return result.data.recipes;
});

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    allRecipes: [],
    dummyAllRecipes: [],
    loading: false,
    errorMsg: ''
  },
  reducers: {
    searchRecipes: (state, actionByHeader) => {
      state.allRecipes = state.dummyAllRecipes.filter(item => item.cuisine.toLowerCase().includes(actionByHeader.payload));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.fulfilled, (state, apiResult) => {
      console.log('Fetched Recipes:', apiResult.payload); // Debug: Log fetched recipies
      state.allRecipes = apiResult.payload;
      state.dummyAllRecipes = apiResult.payload;
      state.loading = false;
      state.errorMsg = '';
    });
    builder.addCase(fetchRecipes.pending, (state) => {
      state.allRecipes = [];
      state.dummyAllRecipes = [];
      state.loading = true;
      state.errorMsg = '';
    });
    builder.addCase(fetchRecipes.rejected, (state) => {
      state.allRecipes = [];
      state.dummyAllRecipes = [];
      state.loading = false;
      state.errorMsg = 'API call failed';
    });
  }
});

export const { searchRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;