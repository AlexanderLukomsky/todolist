import React, { useReducer, useState } from 'react';
import { v1 } from 'uuid';
import './App.scss';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { Header } from './components/Header/Header';
import { addTodolistAC, changeTodolisFilterAC, changeTodolisTitletAC, FilterValueType, removeTodolistAC, todolistReducer } from './components/state/todolist-reducer';
import { Todolist, TasksType } from './components/Todolist/Todolist';
import { addNewTodolistTasksListHandlerAC, addTaskAC, changeTaskStatusAC, editTaskTitleAC, removeTaskAC, tasksReducer } from './reducers/tasksReducer';
export type TasksStateType = {
    [key: string]: TasksType[]
}
const App = () => {
    const todoListID1 = v1()
    const todoListID2 = v1()
    const [todolist, todolistDispatch] = useReducer(todolistReducer, [
        { id: todoListID1, title: 'todolist-1', filter: 'all' },
        { id: todoListID2, title: 'todolist-2', filter: 'all' },
    ])
    const [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [todoListID1]: [
            { id: v1(), title: 'HTML', isDone: true },
            { id: v1(), title: 'SCSS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: '4', isDone: false },
            { id: v1(), title: '5', isDone: false },
            { id: v1(), title: '6', isDone: true },
        ],
        [todoListID2]: [
            { id: v1(), title: 'HTML2', isDone: true },
            { id: v1(), title: 'SCSS2', isDone: false },
            { id: v1(), title: 'ReactJS2', isDone: true },
            { id: v1(), title: '6', isDone: true },
            { id: v1(), title: '3', isDone: false },
            { id: v1(), title: '2', isDone: true },
        ]
    })

    const deleteTasks = (todolistId: string, taskID: string) => {
        tasksDispatch(removeTaskAC(todolistId, taskID))
    }
    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        tasksDispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }
    const changheFilter = (todolistID: string, filter: FilterValueType) => {
        todolistDispatch(changeTodolisFilterAC(todolistID, filter))
    }
    const addTask = (todolistId: string, title: string) => {
        tasksDispatch(addTaskAC(todolistId, title))
    }
    const removeTodolist = (todolistId: string) => {
        todolistDispatch(removeTodolistAC(todolistId))
        delete tasks[todolistId]
    }
    const addTodolist = (title: string) => {
        const todolistID = v1()
        todolistDispatch(addTodolistAC(todolistID, title))
        tasksDispatch(addNewTodolistTasksListHandlerAC(todolistID))
    }
    const editTaskTitle = (todolistID: string, taskID: string, title: string) => {
        tasksDispatch(editTaskTitleAC(todolistID, taskID, title))
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
