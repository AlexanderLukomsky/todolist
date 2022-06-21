import './App.scss';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { Header } from './components/Header/Header';
import { addTodolistTC, changeTodolisFilterAC, changeTodolisTitletTC, fetchTodolistsTC, removeTodolistTC } from './reducers/todolistReducer/todolist-reducer';
import { Todolist } from './components/Todolist/Todolist';
import { addTaskTC, removeTaskTC, updateTaskTC } from './reducers/tasksReducer/tasksReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStoreType } from './reducers/store';
import { useCallback } from 'react';
import { TasksStateType, TaskStatuses } from './types/tasksTypes';
import { TodolistFilterType, TodolistWithFilterType } from './types/todolistsTypes';
import { useEffect } from 'react';
import { Spinner } from './components/Spinner/Spinner';

const AppWithRedux = () => {
    const todolist = useSelector<AppRootStoreType, TodolistWithFilterType[]>(state => state.todolist)
    const tasks = useSelector<AppRootStoreType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])
    const deleteTasks = useCallback((todolistId: string, taskID: string) => {
        dispatch(removeTaskTC(todolistId, taskID))
    }, [dispatch])
    const changeStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistId, taskId, { status }))
    }, [dispatch])
    const changheFilter = useCallback((todolistID: string, filter: TodolistFilterType) => {
        dispatch(changeTodolisFilterAC(todolistID, filter))
    }, [dispatch])
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])
    const editTaskTitle = useCallback((todolistID: string, taskID: string, title: string) => {
        dispatch(updateTaskTC(todolistID, taskID, { title }))
    }, [dispatch])
    const editTodolistTitle = useCallback((todolistID: string, title: string) => {
        dispatch(changeTodolisTitletTC(todolistID, title))
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

