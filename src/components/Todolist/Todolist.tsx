import { useState, ChangeEvent, KeyboardEvent, MouseEvent } from "react"
import { Checkbox } from "../Checkbox/Checkbox"
import style from './Todolist.module.scss'
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
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
}
export const Todolist = ({ title, tasks, removeTodolist, ...props }: TodolistPropstType) => {
    const filteredTasks = (filter: FilterValueType) => {
        switch (filter) {
            case 'completed': return tasks.filter(t => t.isDone === true)
            case 'active': return tasks.filter(t => t.isDone === false)
            default: return tasks
        }
    }
    const [titleValue, setTitleValue] = useState('')
    const onClickHandler = () => {
        if (titleValue.trim() !== "") {
            props.addTask(props.todolistID, titleValue.trim())
            setTitleValue('')
            return
        }
        setErrorStyle('Title is required')
        setTitleValue('')
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => { setTitleValue(e.currentTarget.value) }
    const inputOnKeyPressHanler = (e: KeyboardEvent<HTMLInputElement>) => {
        setErrorStyle(null)
        e.key === 'Enter' && onClickHandler()
    }
    const onChangeStatusHandler = (todolistId: string, taskId: string, isDone: boolean) => { props.changeStatus(todolistId, taskId, isDone) }
    const onChangeFilterTasksHandler = (filter: FilterValueType) => {
        props.changheFilter(props.todolistID, filter)
    }
    const removeTask = (todolistId: string, taskID: string) => { props.deleteTasks(todolistId, taskID) }
    const [errorStyle, setErrorStyle] = useState<string | null>(null)
    return (
        <div>
            <h3>{title} <button onClick={() => { removeTodolist(props.todolistID) }}>X</button> </h3>
            <div>
                <input className={errorStyle ? style.error : ''} value={titleValue} onChange={onChangeInputHandler} onKeyPress={inputOnKeyPressHanler} />
                <button onClick={onClickHandler}>+</button>
                {errorStyle && <div className={style.error_message}>{errorStyle}</div>}
            </div>

            <ul>
                {filteredTasks(props.filterValue).map(el =>
                    <li key={el.id} style={el.isDone ? { opacity: '0.5' } : { opacity: '1' }}>
                        <button onClick={() => { removeTask(props.todolistID, el.id) }}>X</button>
                        <Checkbox callback={(checked) => { onChangeStatusHandler(props.todolistID, el.id, checked) }} isDone={el.isDone} tID={el.id} />
                        <span>{el.title}</span>
                    </li>
                )}
            </ul>
            <div>
                <button className={props.filterValue === "all" ? style.active_filter : ''} onClick={() => { onChangeFilterTasksHandler('all') }}>All</button>
                <button className={props.filterValue === "active" ? style.active_filter : ''} onClick={() => { onChangeFilterTasksHandler('active') }}>Active</button>
                <button className={props.filterValue === 'completed' ? style.active_filter : ''} onClick={() => { onChangeFilterTasksHandler('completed') }}>Completed</button>
            </div>
        </div>
    )
}