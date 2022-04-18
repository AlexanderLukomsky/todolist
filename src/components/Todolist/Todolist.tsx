import { AddItemForm } from "../AddItemForm/AddItemForm"
import { Checkbox } from "../Checkbox/Checkbox"
import { EditableSpan } from "../EditebleSpan/EditeblaSpan"
import { FilterValueType } from "../../reducers/todolistReducer/todolist-reducer"
import style from './Todolist.module.scss'


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
export const Todolist = ({ title, tasks, removeTodolist, ...props }: TodolistPropstType) => {
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
    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistID, title)
    }
    const editTaskTitleHandler = (taskID: string, title: string) => {
        props.editTaskTitle(props.todolistID, taskID, title)
    }
    const editTodolistTitleHandler = (title: string) => {
        props.editTodolistTitle(props.todolistID, title)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={title} callback={editTodolistTitleHandler} />
                <button onClick={() => { removeTodolist(props.todolistID) }}>X</button>
            </h3>
            <AddItemForm callback={addTaskHandler} />
            <ul>
                {filteredTasks(props.filterValue).map(el =>
                    <li key={el.id} style={el.isDone ? { opacity: '0.5' } : { opacity: '1' }}>
                        <button onClick={() => { removeTask(props.todolistID, el.id) }}>x</button>
                        <Checkbox callback={(checked) => { onChangeStatusHandler(props.todolistID, el.id, checked) }} isDone={el.isDone} tID={el.id} />
                        <EditableSpan callback={(title: string) => { editTaskTitleHandler(el.id, title) }} title={el.title} />
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