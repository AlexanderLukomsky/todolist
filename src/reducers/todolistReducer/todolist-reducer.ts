import { v1 } from "uuid"

export type FilterValueType = 'all' | 'active' | 'completed'
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolisTitletACType = ReturnType<typeof changeTodolisTitletAC>
type ChangeTodolisFilterACType = ReturnType<typeof changeTodolisFilterAC>
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
type ActionType = RemoveTodolistACType | AddTodolistACType | ChangeTodolisTitletACType | ChangeTodolisFilterACType
export const todolistReducer = (state: TodolistType[] = [], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': return state.filter(el => el.id !== action.payload.todolistID)
        case 'ADD-TODOLIST': return [{ id: action.todolistID, title: action.payload.title, filter: 'all' }, ...state]
        case 'CHANGE-TODOLIST-TITLE': return state.map(el => el.id === action.payload.todolistID ? { ...el, ...action.payload } : el)
        case 'CHANGE-TODOLIST-FILTER': return state.map(el => el.id === action.payload.todolistID ? { ...el, filter: action.payload.filter } : el)
        default: return state
    }
}
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: { todolistID }
    } as const
}
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        todolistID: v1(),
        payload: { title }
    } as const
}
export const changeTodolisTitletAC = (todolistID: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: { todolistID, title }
    } as const
}
export const changeTodolisFilterAC = (todolistID: string, filter: FilterValueType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: { todolistID, filter }
    } as const
}