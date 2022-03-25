import { Container, Grid, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.scss';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import ButtonAppBar from './components/ButtonAppBar/ButtonAppBar';
import { Header } from './components/Header/Header';
import { TodolistType, Todolist, TasksType, FilterValueType } from './components/Todolist/Todolist';
const App = () => {
    const todoListID1 = v1()
    const todoListID2 = v1()
    const [todolist, setTodolist] = useState<TodolistType[]>([
        { id: todoListID1, title: 'todolist-1', filter: 'all' },
        { id: todoListID2, title: 'todolist-2', filter: 'all' },
    ])
    const [tasks, setTasks] = useState(
        {
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
        }
    )

    const deleteTasks = (todolistId: string, taskID: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskID) })
    }
    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, isDone } : t) })
    }
    const changheFilter = (todolistID: string, filter: FilterValueType) => {
        setTodolist(todolist.map(t => t.id === todolistID ? { ...t, filter } : t))
    }
    const addTask = (todolistId: string, title: string) => {
        setTasks({ ...tasks, [todolistId]: [{ id: v1(), title, isDone: false }, ...tasks[todolistId]] })
    }
    const removeTodolist = (todolistId: string) => {
        setTodolist(todolist.filter(t => t.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodolist = (title: string) => {
        const todolistID = v1()
        setTodolist([{ id: todolistID, title, filter: 'all' }, ...todolist])
        setTasks({ ...tasks, [todolistID]: [] })
    }
    const editTaskTitle = (todolistID: string, taskID: string, title: string) => {
        setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? { ...t, title } : t) })
    }
    const editTodolistTitle = (todolistID: string, title: string) => {
        setTodolist(todolist.map(t => t.id === todolistID ? { ...t, title } : t))
    }
    return (

        <div >
            <ButtonAppBar />
            {/* <Header title='Header' /> */}
            <Container fixed>
                <Grid container style={{ padding: '30px' }}>
                    <AddItemForm callback={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolist.map(t =>
                            <Grid item>
                                <Paper style={{ padding: '10px' }} elevation={6}>
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
                                </Paper>
                            </Grid>
                        )
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default App;
