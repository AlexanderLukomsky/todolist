import { AddItemForm } from "./components/AddItemForm/AddItemForm"
import { Checkbox } from "./components/Checkbox/Checkbox"
import { EditableSpan } from "./components/EditebleSpan/EditeblaSpan"
import { changeTodolisFilterAC, changeTodolisTitletAC, FilterValueType, removeTodolistAC, TodolistType } from "./reducers/todolistReducer/todolist-reducer"
import style from './components/Todolist/Todolist.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { AppRootStoreType } from "./reducers/store"
import { addTaskAC, changeTaskStatusAC, editTaskTitleAC, removeTaskAC } from "./reducers/tasksReducer/tasksReducer"

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropstType = {
    todolist: TodolistType
}
export const TodolistWithoutProps = (props: TodolistPropstType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStoreType, TasksType[]>(state => state.tasks[props.todolist.id])
    const filteredTasks = (filter: FilterValueType) => {
        switch (filter) {
            case 'completed': return tasks.filter(t => t.isDone === true)
            case 'active': return tasks.filter(t => t.isDone === false)
            default: return tasks
        }
    }
    const onChangeStatusHandler = (todolistId: string, taskId: string, isDone: boolean) => { dispatch(changeTaskStatusAC(todolistId, taskId, isDone)) }
    const onChangeFilterTasksHandler = (filter: FilterValueType) => {
        dispatch(changeTodolisFilterAC(props.todolist.id, filter))
    }
    const removeTask = (todolistId: string, taskID: string) => { dispatch(removeTaskAC(todolistId, taskID)) }
    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(props.todolist.id, title))
    }
    const editTaskTitleHandler = (todolistID: string, taskID: string, title: string) => {
        dispatch(editTaskTitleAC(todolistID, taskID, title))
    }
    const editTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolisTitletAC(props.todolist.id, title))
    }
    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title} callback={editTodolistTitleHandler} />
                <button onClick={() => { removeTodolist(props.todolist.id) }}>X</button>
            </h3>
            <AddItemForm callback={addTaskHandler} />
            <ul>
                {filteredTasks(props.todolist.filter).map(el =>
                    <li key={el.id} style={el.isDone ? { opacity: '0.5' } : { opacity: '1' }}>
                        <button onClick={() => { removeTask(props.todolist.id, el.id) }}>x</button>
                        <Checkbox callback={(checked) => { onChangeStatusHandler(props.todolist.id, el.id, checked) }} isDone={el.isDone} tID={el.id} />
                        <EditableSpan callback={(title: string) => { editTaskTitleHandler(props.todolist.id, el.id, title) }} title={el.title} />
                    </li>
                )}
            </ul>
            <div>
                <button className={props.todolist.filter === "all" ? style.active_filter : ''} onClick={() => { onChangeFilterTasksHandler('all') }}>All</button>
                <button className={props.todolist.filter === "active" ? style.active_filter : ''} onClick={() => { onChangeFilterTasksHandler('active') }}>Active</button>
                <button className={props.todolist.filter === 'completed' ? style.active_filter : ''} onClick={() => { onChangeFilterTasksHandler('completed') }}>Completed</button>
            </div>
        </div>
    )
}