import React, { useReducer } from 'react';
import { v1 } from 'uuid';
import './App.scss';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { Header } from './components/Header/Header';
import { addTodolistAC, changeTodolisFilterAC, changeTodolisTitletAC, FilterValueType, removeTodolistAC, todolistReducer, TodolistType } from './reducers/todolistReducer/todolist-reducer';
import { Todolist, TasksType } from './components/Todolist/Todolist';
import { addTaskAC, changeTaskStatusAC, editTaskTitleAC, removeTaskAC, tasksReducer } from './reducers/tasksReducer/tasksReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStoreType } from './reducers/store';
export type TasksStateType = {
    [key: string]: TasksType[]
}
const AppWithRedux = () => {
    const todolist = useSelector<AppRootStoreType, TodolistType[]>(state => state.todolist)
    const tasks = useSelector<AppRootStoreType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const deleteTasks = (todolistId: string, taskID: string) => {
        dispatch(removeTaskAC(todolistId, taskID))
    }
    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }
    const changheFilter = (todolistID: string, filter: FilterValueType) => {
        dispatch(changeTodolisFilterAC(todolistID, filter))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }
    const editTaskTitle = (todolistID: string, taskID: string, title: string) => {
        dispatch(editTaskTitleAC(todolistID, taskID, title))
    }
    const editTodolistTitle = (todolistID: string, title: string) => {
        dispatch(changeTodolisTitletAC(todolistID, title))
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

export default AppWithRedux;
