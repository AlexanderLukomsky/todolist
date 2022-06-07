import { TaskPriorities, TaskStatuses, TaskType } from "./tasksTypes"

export type ResponseTypes<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}
export type GetTaskType<T> = {
    items: T[]
    totalCount: number
    error: null
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type CreateTaskType = {
    item: TaskType
}