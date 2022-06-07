import { AddItemForm } from "./components/AddItemForm/AddItemForm"
import { Checkbox } from "./components/Checkbox/Checkbox"
import { EditableSpan } from "./components/EditebleSpan/EditebleSpan"
import { changeTodolisFilterAC, changeTodolisTitletAC, removeTodolistAC } from "./reducers/todolistReducer/todolist-reducer"
import style from './components/Todolist/Todolist.module.scss'
import { useDispatch } from "react-redux"
import { addTaskAC, createTaskTC, removeTaskAC, updateTaskAC } from "./reducers/tasksReducer/tasksReducer"
import { TaskStatuses } from "./types/tasksTypes"
import { TodolistFilterType, TodolistWithFilterType } from "./types/todolistsTypes"

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropstType = {
    todolist: TodolistWithFilterType
    tasks: TasksType[]
}
const TodolistWithoutProps = (props: TodolistPropstType) => {
    const dispatch = useDispatch()
    const filteredTasks = (filter: TodolistFilterType) => {
        switch (filter) {
            case 'completed': return props.tasks.filter(t => t.isDone === true)
            case 'active': return props.tasks.filter(t => t.isDone === false)
            default: return props.tasks
        }
    }
    const onChangeStatusHandler = (todolistId: string, taskId: string) => { dispatch(updateTaskAC(todolistId, taskId, { status: TaskStatuses.Completed })) }
    const onChangeFilterTasksHandler = (filter: TodolistFilterType) => {
        dispatch(changeTodolisFilterAC(props.todolist.id, filter))
    }
    const removeTask = (todolistId: string, taskID: string) => { dispatch(removeTaskAC(todolistId, taskID)) }
    const addTaskHandler = (title: string) => {
        dispatch(createTaskTC(props.todolist.id, title))
    }
    const editTaskTitleHandler = (todolistID: string, taskID: string, title: string) => {
        dispatch(updateTaskAC(todolistID, taskID, { title }))
    }
    const editTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolisTitletAC(props.todolist.id, title))
    }
    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }

    const taskStatus = (status: TaskStatuses) => {
        switch (status) {
            case TaskStatuses.Completed: return true
            case TaskStatuses.NotCompleted: return false
            default: return false
        }
    }
    return (
        <div>
            <h3>
                <EditableSpan value={props.todolist.title} callback={editTodolistTitleHandler} />
                <button onClick={() => { removeTodolist(props.todolist.id) }}>X</button>
            </h3>
            <AddItemForm callback={addTaskHandler} />
            <ul>
                {filteredTasks(props.todolist.filter).map(el =>
                    <li key={el.id} style={el.isDone ? { opacity: '0.5' } : { opacity: '1' }}>
                        <button onClick={() => { removeTask(props.todolist.id, el.id) }}>x</button>
                        <Checkbox callback={() => { onChangeStatusHandler(props.todolist.id, el.id) }} status={el.isDone} tID={el.id} />
                        <EditableSpan callback={(title: string) => { editTaskTitleHandler(props.todolist.id, el.id, title) }} value={el.title} />
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