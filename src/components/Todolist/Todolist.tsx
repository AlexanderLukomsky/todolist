import { AddItemForm } from "../AddItemForm/AddItemForm"
import { Checkbox } from "../Checkbox/Checkbox"
import { EditableSpan } from "../EditebleSpan/EditebleSpan"
import { FilterValueType } from "../../reducers/todolistReducer/todolist-reducer"
import style from './Todolist.module.scss'
import { useCallback } from "react"
import React from "react"
import { Task } from "../Task/Task"


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropstType = {
    deleteTasks: (todolistID: string, taskId: string) => void
    addTask: (todolistId: string, title: string) => void
    title: string
    tasks: TasksType[]
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filterValue: FilterValueType
    todolistID: string
    changheFilter: (todolistID: string, filter: FilterValueType) => void
    removeTodolist: (todolistId: string) => void
    editTaskTitle: (todolistID: string, taskID: string, title: string) => void
    editTodolistTitle: (todolistID: string, title: string) => void
}
export const Todolist = React.memo(({ title, tasks, removeTodolist, addTask, ...props }: TodolistPropstType) => {
    //   debugger
    console.log('Todolist');
    const filteredTasks = (filter: FilterValueType) => {
        switch (filter) {
            case 'completed': return tasks.filter(t => t.isDone === true)
            case 'active': return tasks.filter(t => t.isDone === false)
            default: return tasks
        }
    }
    const onChangeStatusHandler = (todolistId: string, taskId: string, isDone: boolean) => { props.changeStatus(todolistId, taskId, isDone) }
    const onChangeFilterTasksHandler = (filter: FilterValueType) => {
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
                        removeTask={removeTask} onChangeStatusHandler={onChangeStatusHandler}
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