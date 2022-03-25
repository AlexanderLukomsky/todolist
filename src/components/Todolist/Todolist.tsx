import { IconButton } from "@material-ui/core"
import { Button } from "@material-ui/core"
import { Delete } from "@material-ui/icons"
import { AddItemForm } from "../AddItemForm/AddItemForm"
import { Checkbox } from "../Checkbox/Checkbox"
import { EditableSpan } from "../EditebleSpan/EditeblaSpan"
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
                <IconButton
                    style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', color: 'red' }}
                    aria-label="delete" color="primary" onClick={() => { removeTodolist(props.todolistID) }}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm callback={addTaskHandler} />
            <ul>
                {filteredTasks(props.filterValue).map(el =>
                    <li key={el.id} style={el.isDone ? { opacity: '0.5' } : { opacity: '1' }}>
                        <IconButton
                            style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', color: 'red' }}
                            aria-label="delete" color="primary" onClick={() => { removeTask(props.todolistID, el.id) }}>
                            <Delete />
                        </IconButton>
                        <Checkbox callback={(checked) => { onChangeStatusHandler(props.todolistID, el.id, checked) }} isDone={el.isDone} tID={el.id} />
                        <EditableSpan callback={(title: string) => { editTaskTitleHandler(el.id, title) }} title={el.title} />
                    </li>
                )}
            </ul>
            <div>
                <Button
                    variant={props.filterValue === "all" ? "contained" : 'outlined'}
                    color="primary"
                    onClick={() => { onChangeFilterTasksHandler('all') }} >All</Button>
                <Button
                    variant={props.filterValue === "active" ? "contained" : 'outlined'}
                    color="primary"
                    onClick={() => { onChangeFilterTasksHandler('active') }} >Active</Button>
                <Button variant={props.filterValue === "completed" ? "contained" : 'outlined'}
                    color="primary"
                    onClick={() => { onChangeFilterTasksHandler('completed') }} >Completed</Button>
                {/* <button className={props.filterValue === "all" ? style.active_filter : ''} onClick={() => { }}>All</button>
                <button className={props.filterValue === "active" ? style.active_filter : ''} onClick={() => { }}>Active</button>
                <button className={props.filterValue === 'completed' ? style.active_filter : ''} onClick={() => { }}>Completed</button> */}
            </div>
        </div>
    )
}
//*! className={props.filterValue === "all" ? style.active_filter : ''}
//*! className={props.filterValue === "active" ? style.active_filter : ''}
//*! className={props.filterValue === 'completed' ? style.active_filter : ''}