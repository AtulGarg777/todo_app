import {configureStore} from '@reduxjs/toolkit'
import todosReducer from './slices/TodosSlice'


export const store=configureStore({
    reducer:{
        todos:todosReducer
    }
})