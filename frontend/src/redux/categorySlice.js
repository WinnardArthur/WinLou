import { createSlice } from '@reduxjs/toolkit';

const categories = [
    {
        id: 1,
        category: 'Programming'
    },
    {
        id: 2,
        category: 'Medicine'
    },
    {
        id: 3,
        category: 'Sports'
    },
    {
        id: 4,
        category: 'Writing'
    },
    {
        id: 5,
        category: 'Education'
    },
    {
        id: 6,
        category: 'Music'
    },
    {
        id: 7,
        category: 'Health'
    },
    {
        id: 8,
        category: 'Other'
    } 
  ]


export const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories,
        activeCategory: ""
    },
    reducers: {
        addCategory: (state, action) => {
            state.activeCategory = action.payload.category;
        }
    }
})

export const { addCategory } = categorySlice.actions;

export default categorySlice.reducer;