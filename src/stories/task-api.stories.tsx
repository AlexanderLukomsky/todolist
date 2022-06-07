import { ChangeEvent, useEffect, useState } from "react"
import { TaskAPI } from "../api/task-api"
import { TodolistApi } from "../api/todolist-api"

export default {
    title: 'API/Task'
}
export const CreateTask = () => {
    const [state, setState] = useState<any>()
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistID, setTodolistID] = useState<string>('')
    const createTask = () => {
        TaskAPI.createTask(todolistID, taskTitle)
            .then(res => {
                console.log(res);
                setState(res.data)
            })
    }
    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    const onChangeTodolistID = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistID(e.currentTarget.value)
    }
    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text" placeholder="todolistID" value={todolistID} onChange={onChangeTodolistID} />
                <input type="text" placeholder="Task Title" value={taskTitle} onChange={onChangeTaskTitle} />
                <button onClick={createTask}>create task</button>
            </div>
        </div>
    )
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>('')
    const onChangeTodolistID = (e: ChangeEvent<HTMLInputElement>) => { setTodolistID(e.currentTarget.value) }
    const getTask = () => {
        TaskAPI.getTask(todolistID)
            .then(res => {
                setState(res.data)
                return res
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text" placeholder="todolistID" onChange={onChangeTodolistID} />
                <button onClick={getTask}>get task</button>
            </div>
        </div>
    )
}
export const UpdateTaskTitle = () => {
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistID, setTodolistID] = useState<string>('')
    const [taskID, setTaskID] = useState<string>('')
    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    const onChangeTodolistID = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistID(e.currentTarget.value)
    }
    const onChangeTaskID = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskID(e.currentTarget.value)
    }
    const changeTaskTitle = () => {
        TaskAPI.updateTask(todolistID, taskID, {
            title: taskTitle,
            description: 'bla bla',
            status: 0,
            priority: 0,
            startDate: '',
            deadline: ''
        })
            .then(res => { setRes(res.data.data) })
    }
    const [tasks, setTasks] = useState<any>(null)
    const [res, setRes] = useState<any>(null)

    useEffect(() => {
        TodolistApi.getTodolists()
            .then(data => {
                setTodolistID(data[0].id)
                return data[0].id
            })
            .then((id) => {
                TaskAPI.getTask(id)
                    .then(res => {
                        setTasks(res.data.items)
                        return res.data.items[0].id
                    })
                    .then(id => {
                        setTaskID(id)
                    })
            })
    }, [])

    return (
        <div>
            {JSON.stringify(tasks)}
            <div>
                <input type="text" value={taskTitle} placeholder="task title" onChange={onChangeTaskTitle} />
                <input type="text" value={todolistID} placeholder="todolistID" onChange={onChangeTodolistID} />
                <input type="text" value={taskID} placeholder="taskID" onChange={onChangeTaskID} />
                <button onClick={changeTaskTitle}>change title</button>
            </div>
            <div>
                {JSON.stringify(res)}
            </div>
        </div>
    )
}
export const DeleteTask = () => {
    const [state, setState] = useState()
    useEffect(() => {

    }, [])
    return (
        <div>
            {JSON.stringify(state)}
        </div>
    )
}