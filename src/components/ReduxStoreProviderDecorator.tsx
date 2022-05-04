import React from "react";
import { Provider } from "react-redux";
import { v1 } from "uuid";
import { AppRootStoreType, store } from "../reducers/store";
import { tasksReducer } from "../reducers/tasksReducer/tasksReducer";
import { todolistReducer } from "../reducers/todolistReducer/todolist-reducer";
import { combineReducers } from "redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
//StoryFn:Story - ReduxStoreProviderDecorator alternative props type
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistReducer
})

const initialGlobalState: AppRootStoreType = {
    todolist: [
        { id: 'TodolistID1', title: 'What to learn', filter: 'all' },
        { id: 'TodolistID2', title: 'What to buy', filter: 'all' }
    ],
    tasks: {
        "TodolistID1": [
            { id: v1(), title: 'HTML', isDone: true },
            { id: v1(), title: 'JS', isDone: true }
        ],
        "TodolistID2": [
            { id: v1(), title: 'Milk', isDone: true },
            { id: v1(), title: 'Sugar', isDone: false }
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

