export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type a = {
    [key: string]: any[]
}
export type b = {
    [key: string]: { id: string, title: string, status: TaskStatuses, description: string, priority: TaskPriorities, startDate: string, deadline: string, todoListId: string, order: number, addedDate: string, }[]
}
export type TasksStateType = {
    [key: string]: TaskType[]
}
export enum TaskStatuses {
    NotCompleted = 0,
    InProgress = 1,
    Completed = 2,
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hight = 2,
}