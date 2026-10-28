import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        value: []
    },
    reducers: {
        createTodo: (state, action) => {
            console.log(action);
            state.value.push(action.payload)
        },
        intializeTodo: (state, action) => {
            state.value = action.payload.map((val, i) => val.todo)
        },
        removeTodo: (state, action) => {
            state.value = state.value.filter(((val, i) => i != action.payload))
        },

        updateTodo: (state, action) => {
            state.value = state.value.map((v, i) => i == action.payload.editInd ? action.payload.inpValue : v)
        }
    }
})

export const { createTodo, intializeTodo, removeTodo,updateTodo } = todoSlice.actions
export default todoSlice.reducer;