import './App.scss';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { Header } from './components/Header/Header';
import { addTodolistAC, changeTodolisFilterAC, changeTodolisTitletAC, FilterValueType, removeTodolistAC, TodolistType } from './reducers/todolistReducer/todolist-reducer';
import { Todolist, TasksType } from './components/Todolist/Todolist';
import { addTaskAC, changeTaskStatusAC, editTaskTitleAC, removeTaskAC } from './reducers/tasksReducer/tasksReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStoreType } from './reducers/store';
import React, { useCallback } from 'react';
export type TasksStateType = {
    [key: string]: TasksType[]
}
const AppWithRedux = () => {
    const todolist = useSelector<AppRootStoreType, TodolistType[]>(state => state.todolist)
    const tasks = useSelector<AppRootStoreType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()
    const deleteTasks = useCallback((todolistId: string, taskID: string) => {
        dispatch(removeTaskAC(todolistId, taskID))
    }, [dispatch])
    const changeStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }, [dispatch])
    const changheFilter = useCallback((todolistID: string, filter: FilterValueType) => {
        dispatch(changeTodolisFilterAC(todolistID, filter))
    }, [dispatch])
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])
    const editTaskTitle = useCallback((todolistID: string, taskID: string, title: string) => {
        dispatch(editTaskTitleAC(todolistID, taskID, title))
    }, [dispatch])
    const editTodolistTitle = useCallback((todolistID: string, title: string) => {
        dispatch(changeTodolisTitletAC(todolistID, title))
    }, [dispatch])

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
