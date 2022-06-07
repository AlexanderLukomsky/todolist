import React from "react";
import { Provider } from "react-redux";
import { v1 } from "uuid";
import { AppRootStoreType, store } from "../reducers/store";
import { tasksReducer } from "../reducers/tasksReducer/tasksReducer";
import { todolistReducer } from "../reducers/todolistReducer/todolist-reducer";
import { combineReducers } from "redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { TaskPriorities, TaskStatuses } from "../types/tasksTypes";
//StoryFn:Story - ReduxStoreProviderDecorator alternative props type
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistReducer
})
const initialGlobalState: AppRootStoreType = {
    todolist: [
        { id: 'TodolistID1', title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
        { id: 'TodolistID2', title: 'What to buy', filter: 'all', addedDate: '', order: 0 }
    ],
    tasks: {
        "TodolistID1": [
            { id: v1(), title: 'HTML', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '' },
            { id: v1(), title: 'JS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '' }
        ],
        "TodolistID2": [
            { id: v1(), title: 'Milk', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '' },
            { id: v1(), title: 'Sugar', status: TaskStatuses.NotCompleted, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '' }
        ]

    }
}
export const storybookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState
})
export const ReduxStoreProviderDecorator = (StoryFn: () => JSX.Element) => {
    return <Provider store={storybookStore}> <StoryFn /> </Provider>;
}

