import { Dispatch } from 'redux';
import { AppRootStoreType } from './../store';
import { UpdateTaskModelType } from './../../types/apiTypes';
import { TaskAPI } from './../../api/task-api';
import { TaskPriorities, TasksStateType, TaskStatuses, TaskType } from './../../types/tasksTypes';
import { AddTodolistACType, RemoveTodolistACType, SetTodolistsACType } from "../todolistReducer/todolist-reducer"
type TasksReducerType =
    | AddTodolistACType
    | RemoveTodolistACType
    | SetTodolistsACType
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>

type UpdatePropertiesTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export const tasksReducer = (state: TasksStateType = {}, action: TasksReducerType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            const stateCopy = { ...state }
            action.payload.todolists.forEach(t => {
                stateCopy[t.id] = []
            });
            return stateCopy
        }
        case 'REMOVE-TASKS':
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskID) }
        case 'ADD-TASK':
            return {
                ...state, [action.payload.task.todoListId]: [{
                    ...action.payload.task
                }, ...state[action.payload.task.todoListId]]
            }
        case 'ADD-TODOLIST':
            return { ...state, [action.payload.todolist.id]: [] }
        case 'REMOVE-TODOLIST':
            const stateCopy = { ...state }
            delete stateCopy[action.payload.todolistID];
            return { ...stateCopy }
        case 'SET-TASKS': return { ...state, [action.payload.todolistID]: action.payload.tasks }
        case 'UPDATE-TASK':
            return { ...state, [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.taskID ? { ...t, ...action.payload.taskModel } : t) }
        default: return state
    }
}

export const removeTaskAC = (todolistId: string, taskID: string) => (
    {
        type: 'REMOVE-TASKS',
        payload: { todolistId, taskID }
    } as const
)
export const addTaskAC = (task: TaskType) => (
    {
        type: 'ADD-TASK',
        payload: { task }
    } as const
)
export const setTasksAC = (tasks: TaskType[], todolistID: string) => (
    {
        type: 'SET-TASKS',
        payload: { tasks, todolistID }
    } as const
)
export const fetchTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    TaskAPI.getTask(todolistID)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistID))
        })
}
export const removeTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch) => {
    TaskAPI.deleteTask(todolistID, taskID)
        .then(() => {
            dispatch(removeTaskAC(todolistID, taskID))
        })

}
export const createTaskTC = (todolistID: string, taskTitle: string) => (dispatch: Dispatch) => {
    TaskAPI.createTask(todolistID, taskTitle)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}




export const updateTaskAC = (todolistID: string, taskID: string, taskModel: UpdatePropertiesTaskType) => (
    {
        type: 'UPDATE-TASK',
        payload: {
            todolistID, taskID, taskModel
        }
    } as const
)

export const updateTaskTC = (todolistID: string, taskID: string, taskModelProp: UpdatePropertiesTaskType) => (dispatch: Dispatch, getState: () => AppRootStoreType) => {

    const task = getState().tasks[todolistID]
        .find(t => t.id === taskID)
    if (!task) throw new Error('task not found')

    const model: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...taskModelProp
    }
    TaskAPI.updateTask(todolistID, taskID, model)
        .then(() => {
            dispatch(updateTaskAC(todolistID, taskID, model))
        })
}