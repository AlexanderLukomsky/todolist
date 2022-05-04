import { combineReducers } from "redux";
import { tasksReducer } from "./tasksReducer/tasksReducer";
import { todolistReducer } from "./todolistReducer/todolist-reducer";
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistReducer
})
export const store = configureStore({
    reducer: rootReducer
})
export type AppRootStoreType = ReturnType<typeof rootReducer>
