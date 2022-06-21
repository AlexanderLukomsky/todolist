import { AddItemForm } from "../AddItemForm/AddItemForm"
import { EditableSpan } from "../EditebleSpan/EditebleSpan"

import style from './Todolist.module.scss'
import { useCallback, useEffect } from "react"
import React from "react"
import { Task } from "../Task/Task"
import { TaskStatuses, TaskType } from "../../types/tasksTypes"
import { TodolistFilterType } from "../../types/todolistsTypes"
import { useDispatch } from "react-redux"
import { fetchTasksTC } from "../../reducers/tasksReducer/tasksReducer"


type TodolistPropstType = {
    deleteTasks: (todolistID: string, taskId: string) => void
    addTask: (todolistId: string, title: string) => void
    title: string
    tasks: TaskType[]
    changeStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    filterValue: TodolistFilterType
    todolistID: string
    changheFilter: (todolistID: string, filter: TodolistFilterType) => void
    removeTodolist: (todolistId: string) => void
    editTaskTitle: (todolistID: string, taskID: string, title: string) => void
    editTodolistTitle: (todolistID: string, title: string) => void
}
export const Todolist = React.memo(({ title, tasks, removeTodolist, addTask, ...props }: TodolistPropstType) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(props.todolistID))
    }, [])

    const filteredTasks = (filter: TodolistFilterType) => {
        switch (filter) {
            case 'completed': return tasks.filter(t => t.status === TaskStatuses.Completed)
            case 'active': return tasks.filter(t => t.status === TaskStatuses.NotCompleted)
            default: return tasks
        }
    }
    const changeStatus = useCallback((todolistId: string, taskId: string, status: boolean) => {
        const convertStatus = status ? TaskStatuses.Completed : TaskStatuses.NotCompleted
        props.changeStatus(todolistId, taskId, convertStatus)
    }, [])
    const onChangeFilterTasksHandler = (filter: TodolistFilterType) => {
        props.changheFilter(props.todolistID, filter)
    }
    const removeTask = (todolistId: string, taskID: string) => { props.deleteTasks(todolistId, taskID) }
    const addTaskHandler = useCallback((title: string) => {
        addTask(props.todolistID, title)
    }, [addTask, props.todolistID])
    const editTaskTitleHandler = (taskID: string, title: string) => {
        props.editTaskTitle(props.todolistID, taskID, title)
    }
    const editTodolistTitleHandler = (title: string) => {
        props.editTodolistTitle(props.todolistID, title)
    }
    return (
        <div>
            <h3>
                <EditableSpan value={title} callback={editTodolistTitleHandler} />
                <button onClick={() => { removeTodolist(props.todolistID) }}>X</button>
            </h3>
            <AddItemForm callback={addTaskHandler} />
            <ul>
                {filteredTasks(props.filterValue).map(el =>
                    <Task
                        key={el.id}
                        task={el} todolistID={props.todolistID}
                        removeTask={removeTask} changeStatus={changeStatus}
                        editTaskTitleHandler={editTaskTitleHandler}
                    />
                )}
            </ul>
            <div>
                <button className={props.filterValue === "all" ? style.active_filter : ''} onClick={() => { onChangeFilterTasksHandler('all') }}>All</button>
                <button className={props.filterValue === "active" ? style.active_filter : ''} onClick={() => { onChangeFilterTasksHandler('active') }}>Active</button>
                <button className={props.filterValue === 'completed' ? style.active_filter : ''} onClick={() => { onChangeFilterTasksHandler('completed') }}>Completed</button>
            </div>
        </div>
    )
})