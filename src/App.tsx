import React, { useReducer } from 'react';
import { v1 } from 'uuid';
import './App.scss';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { Header } from './components/Header/Header';
import { addTodolistAC, changeTodolisFilterAC, changeTodolisTitletAC, removeTodolistAC, todolistReducer } from './reducers/todolistReducer/todolist-reducer';
import { Todolist } from './components/Todolist/Todolist';
import { addTaskAC, removeTaskAC, tasksReducer, updateTaskAC } from './reducers/tasksReducer/tasksReducer';
import { TaskPriorities, TaskStatuses } from './types/tasksTypes';
import { TodolistFilterType } from './types/todolistsTypes';


//test commit

const App = () => {
    const todoListID1 = v1()
    const todoListID2 = v1()
    const [todolist, todolistDispatch] = useReducer(todolistReducer, [
        { id: todoListID1, title: 'todolist-1', filter: 'all', addedDate: '', order: 0 },
        { id: todoListID2, title: 'todolist-2', filter: 'all', addedDate: '', order: 0 },
    ])

    const [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [todoListID1]: [
            { id: v1(), title: 'HTML', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '', },
            { id: v1(), title: 'SCSS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '', },
            { id: v1(), title: 'ReactJS', status: TaskStatuses.NotCompleted, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '', },
            { id: v1(), title: '4', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '', },
            { id: v1(), title: '5', status: TaskStatuses.NotCompleted, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '', },
            { id: v1(), title: 'HTML', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '', },
        ],
        [todoListID2]: [
            { id: v1(), title: 'HTML2', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '', },
            { id: v1(), title: 'SCSS2', status: TaskStatuses.NotCompleted, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '', },
            { id: v1(), title: 'ReactJS2', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '', },
            { id: v1(), title: '4', status: TaskStatuses.NotCompleted, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '', },
            { id: v1(), title: '5', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '', },
        ]

    })
    const deleteTasks = (todolistId: string, taskID: string) => {
        tasksDispatch(removeTaskAC(todolistId, taskID))
    }
    const changeStatus = (todolistId: string, taskId: string, status: TaskStatuses) => {
        tasksDispatch(updateTaskAC(todolistId, taskId, { status: status }))
    }
    const changheFilter = (todolistID: string, filter: TodolistFilterType) => {
        todolistDispatch(changeTodolisFilterAC(todolistID, filter))
    }
    const addTask = (todolistId: string, title: string) => {
        tasksDispatch(
            addTaskAC({
                id: v1(), title: title,
                status: TaskStatuses.NotCompleted,
                description: '',
                priority: TaskPriorities.Low, startDate: '',
                deadline: '',
                todoListId: todolistId,
                order: 0,
                addedDate: ''
            })
        )
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        todolistDispatch(action)
        tasksDispatch(action)
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC({
            id: v1(),
            title,
            addedDate: '',
            order: 0
        })
        todolistDispatch(action)
        tasksDispatch(action)
    }
    const editTaskTitle = (todolistID: string, taskID: string, title: string) => {
        tasksDispatch(updateTaskAC(todolistID, taskID, { title }))
    }
    const editTodolistTitle = (todolistID: string, title: string) => {
        todolistDispatch(changeTodolisTitletAC(todolistID, title))
    }
    return (

        <div>
            <Header title='Header' />
            <AddItemForm callback={addTodolist} />
            {
                todolist.map(t =>
                    <Todolist
                        key={t.id}
                        todolistID={t.id}
                        title={t.title}
                        tasks={tasks[t.id]}
                        filterValue={t.filter}
                        deleteTasks={deleteTasks}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        changheFilter={changheFilter}
                        removeTodolist={removeTodolist}
                        editTaskTitle={editTaskTitle}
                        editTodolistTitle={editTodolistTitle}
                    />
                )
            }
        </div>
    )
}

export default App;


