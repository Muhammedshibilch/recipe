import { configureStore } from "@reduxjs/toolkit";
import recipesSlice from "./slice/recipesSlice"
const recipeStore = configureStore({
    reducer:{
        recipesReducer : recipesSlice
    }
})
export default recipeStore