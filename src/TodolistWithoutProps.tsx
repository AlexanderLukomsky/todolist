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
    todolistID: string
}
export const TodolistWithoutProps = (props: TodolistPropstType) => {
    const dispatch = useDispatch()
    const todolist = useSelector<AppRootStoreType, TodolistType>(state => state.todolist.filter(t => t.id === props.todolistID)[0])
    const tasks = useSelector<AppRootStoreType, TasksType[]>(state => state.tasks[todolist.id])
    const filteredTasks = (filter: FilterValueType) => {
        switch (filter) {
            case 'completed': return tasks.filter(t => t.isDone === true)
            case 'active': return tasks.filter(t => t.isDone === false)
            default: return tasks
        }
    }
    const onChangeStatusHandler = (todolistId: string, taskId: string, isDone: boolean) => { dispatch(changeTaskStatusAC(todolistId, taskId, isDone)) }
    const onChangeFilterTasksHandler = (filter: FilterValueType) => {
        dispatch(changeTodolisFilterAC(todolist.id, filter))
    }
    const removeTask = (todolistId: string, taskID: string) => { dispatch(removeTaskAC(todolistId, taskID)) }
    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(todolist.id, title))
    }
    const editTaskTitleHandler = (todolistID: string, taskID: string, title: string) => {
        dispatch(editTaskTitleAC(todolistID, taskID, title))
    }
    const editTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolisTitletAC(todolist.id, title))
    }
    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }
    return (
        <div>
            <h3>
                <EditableSpan title={todolist.title} callback={editTodolistTitleHandler} />
                <button onClick={() => { removeTodolist(todolist.id) }}>X</button>
            </h3>
            <AddItemForm callback={addTaskHandler} />
            <ul>
                {filteredTasks(todolist.filter).map(el =>
                    <li key={el.id} style={el.isDone ? { opacity: '0.5' } : { opacity: '1' }}>
                        <button onClick={() => { removeTask(todolist.id, el.id) }}>x</button>
                        <Checkbox callback={(checked) => { onChangeStatusHandler(todolist.id, el.id, checked) }} isDone={el.isDone} tID={el.id} />
                        <EditableSpan callback={(title: string) => { editTaskTitleHandler(todolist.id, el.id, title) }} title={el.title} />
                    </li>
                )}
            </ul>
            <div>
                <button className={todolist.filter === "all" ? style.active_filter : ''} onClick={() => { onChangeFilterTasksHandler('all') }}>All</button>
                <button className={todolist.filter === "active" ? style.active_filter : ''} onClick={() => { onChangeFilterTasksHandler('active') }}>Active</button>
                <button className={todolist.filter === 'completed' ? style.active_filter : ''} onClick={() => { onChangeFilterTasksHandler('completed') }}>Completed</button>
            </div>
        </div>
    )
}