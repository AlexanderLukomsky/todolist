import { v1 } from "uuid"
import { TasksStateType } from "../../App"
import { AddTodolistACType, RemoveTodolistACType } from "../todolistReducer/todolist-reducer"
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
//type AddNewTodolistHandlerACType = ReturnType<typeof addNewTodolistTasksListHandlerAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type EditTaskTitleACType = ReturnType<typeof editTaskTitleAC>
type TasksReducerType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | EditTaskTitleACType | AddTodolistACType | RemoveTodolistACType
export const tasksReducer = (state: TasksStateType = {}, action: TasksReducerType) => {
    switch (action.type) {
        case 'REMOVE-TASKS':
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskID) }
        case 'ADD-TASK':
            return { ...state, [action.payload.todolistId]: [{ id: v1(), title: action.payload.title, isDone: false }, ...state[action.payload.todolistId]] }
        case 'ADD-TODOLIST':
            return { ...state, [action.todolistID]: [] }
        case 'CHANGE-TASK-STATUS':
            return { ...state, [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskID ? { ...el, ...action.payload } : el) }
        case 'EDIT-TASK-TITLE':
            return { ...state, [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskID ? { ...el, ...action.payload } : el) }
        case 'REMOVE-TODOLIST':
            const stateCopy = { ...state }
            delete stateCopy[action.payload.todolistID];
            return { ...stateCopy }
        default: return state
    }
}

export const removeTaskAC = (todolistId: string, taskID: string) => {
    return {
        type: 'REMOVE-TASKS',
        payload: { todolistId, taskID }
    } as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: { todolistId, title }
    } as const
}
export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: { todolistID, taskID, isDone }
    } as const
}
// export const addNewTodolistTasksListHandlerAC = (todolistID: string) => {
//     return {
//         type: 'ADD-EMPTY-TASKLIST-FOR-NEW-TODOLIST',
//         payload: { todolistID }
//     } as const
// }
export const editTaskTitleAC = (todolistID: string, taskID: string, title: string) => {
    return {
        type: 'EDIT-TASK-TITLE',
        payload: { todolistID, taskID, title }
    } as const
}