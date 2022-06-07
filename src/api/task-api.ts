import axios from "axios";
import { CreateTaskType, GetTaskType, ResponseTypes, UpdateTaskModelType } from "../types/apiTypes";
import { TaskType } from "../types/tasksTypes";



export const TaskAPI = {
    _instance: axios.create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        headers: {
            "API-KEY": "1b228bfc-8734-47cb-b840-f8cc669c3e6c"
        }

    }),
    getTask(todolistID: string) {
        return this._instance.get<GetTaskType<TaskType>>(`todo-lists/${todolistID}/tasks`)

    },
    createTask(todolistID: string, taskTitle: string) {
        return this._instance.post<ResponseTypes<CreateTaskType>>(`todo-lists/${todolistID}/tasks`, { title: taskTitle })
    },
    deleteTask(todolistID: string, taskID: string) {
        return this._instance.delete(`todo-lists/${todolistID}/tasks/${taskID}`)
    },
    updateTask(todolistID: string, taskID: string, task: UpdateTaskModelType) {
        return this._instance.put(`todo-lists/${todolistID}/tasks/${taskID}`, task)
    }
}