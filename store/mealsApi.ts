import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mealsApi = createApi({
  reducerPath: 'mealsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.themealdb.com/api/json/v1/1/' }),
  tagTypes: ['Meals', 'MealDetail'],  
  // keepUnusedDataFor: 3600,   

  endpoints: (builder) => ({
    getMeals: builder.query({
      query: (search: string) => `search.php?s=${search}`,
      providesTags: ['Meals'],        
    }),

    getMealById: builder.query({
      query: (id: string) => `lookup.php?i=${id}`,
      providesTags: (result, error, id) => [
        { type: 'MealDetail', id }  
      ],
    }),

  }),
});

export const { useGetMealsQuery, useGetMealByIdQuery } = mealsApi;