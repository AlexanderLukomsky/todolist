import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasksReducer/tasksReducer";
import { todolistReducer } from "./todolistReducer/todolist-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistReducer
})
export const store = createStore(rootReducer)
export type AppRootStoreType = ReturnType<typeof rootReducer>


(<any>window).store = store