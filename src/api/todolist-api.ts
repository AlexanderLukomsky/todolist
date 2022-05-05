import axios from "axios"

// const instance = axios.create({
//     withCredentials: true,
//     baseURL: 'https://social-network.samuraijs.com/api/1.1/',
//     headers: {
//         "API-KEY": "1b228bfc-8734-47cb-b840-f8cc669c3e6c"
//     }
// })

export const TodolistApi = {
    _instance: axios.create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        headers: {
            "API-KEY": "1b228bfc-8734-47cb-b840-f8cc669c3e6c"
        }

    }),
    getTodolist: () => {
        return TodolistApi._instance.get<TodolistType[]>('todo-lists')
            .then(response => response.data)
    },
    createTodolist: (title: string) => {
        return TodolistApi._instance.post<CommonResponseType<{ item: TodolistType }>>('todo-lists', { title })
            .then(res => res)
    },
    deleteTodolist: (id: string) => {
        return TodolistApi._instance.delete<CommonResponseType>(`todo-lists/${id}`)
            .then(res => res.data)
    },
    UpdateTodolistTitle: (id: string, title: string) => {
        debugger
        return TodolistApi._instance.put<CommonResponseType>(`todo-lists/${id}`, { title })
            .then(res => res.data)
    }
}

type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type CommonResponseType<T = {}> = {
    data: T
    messages: string[],
    fieldsErrors: string[],
    resultCode: number
}