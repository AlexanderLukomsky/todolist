import React, { useEffect, useState } from 'react'
import { TodolistApi } from '../api/todolist-api'

export default {
    title: 'API/Todolist'
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistApi.getTodolists()
            .then((data) => {
                setState(data);
            })

    }, [])


    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistApi.createTodolist('create todolist')
            .then(res => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistApi.getTodolists()
            .then(data => {
                const tl: any[] = data
                tl.map(el => TodolistApi.deleteTodolist(el.id))
            })

        // api.deleteTodolist("018bf44d-ae50-45e7-aaad-bcb714ca1af6")
        //     .then(data => setState(data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistApi.changeTodolistTitle("44f712dc-cc1e-4d2c-bd3b-032cf20613e0", 'REACT 18')
            .then(res => { setState(res.data) })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}