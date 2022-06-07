import { TodolistApi } from './../../api/todolist-api';
import { Dispatch } from "redux"
import { v1 } from "uuid"
import { TodolistFilterType, TodolistType, TodolistWithFilterType } from "../../types/todolistsTypes"


export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
type ActionType =
    | RemoveTodolistACType
    | AddTodolistACType
    | SetTodolistsACType
    | ReturnType<typeof changeTodolisTitletAC>
    | ReturnType<typeof changeTodolisFilterAC>

export const todolistReducer = (state: TodolistWithFilterType[] = [], action: ActionType): TodolistWithFilterType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': return state.filter(el => el.id !== action.payload.todolistID)
        case 'ADD-TODOLIST': return [{ ...action.payload.todolist, filter: 'all' }, ...state]
        case 'CHANGE-TODOLIST-TITLE': return state.map(el => el.id === action.payload.todolistID ? { ...el, ...action.payload } : el)
        case 'CHANGE-TODOLIST-FILTER': return state.map(el => el.id === action.payload.todolistID ? { ...el, filter: action.payload.filter } : el)
        case 'SET-TODOLISTS': return action.payload.todolists.map(t => ({ ...t, filter: 'all' }))
        default: return state
    }
}
export const removeTodolistAC = (todolistID: string) => (
    {
        type: 'REMOVE-TODOLIST',
        payload: { todolistID }
    } as const
)
export const addTodolistAC = (todolist: TodolistType) => (
    {
        type: 'ADD-TODOLIST',
        payload: { todolist }
    } as const
)
export const changeTodolisTitletAC = (todolistID: string, title: string) => (
    {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: { todolistID, title }
    } as const
)
export const changeTodolisFilterAC = (todolistID: string, filter: TodolistFilterType) => (
    {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: { todolistID, filter }
    } as const
)

export const setTodolistsAC = (todolists: TodolistType[]) => (
    {
        type: 'SET-TODOLISTS',
        payload: {
            todolists
        }
    } as const
)


export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    TodolistApi.getTodolists()
        .then(data => {
            dispatch(setTodolistsAC(data))
        })
}
export const removeTodolistTC = (todolistID: string) => (dispatch: Dispatch) => {
    TodolistApi.deleteTodolist(todolistID)
        .then(() => {
            dispatch(removeTodolistAC(todolistID))
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    TodolistApi.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodolisTitletTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    TodolistApi.changeTodolistTitle(todolistID, title)
        .then(res => {
            console.log(res.data);
            dispatch(changeTodolisTitletAC(todolistID, title))

        })
}
