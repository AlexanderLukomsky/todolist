import { tasksReducer } from './../tasksReducer/tasksReducer';
import { removeTodolistAC, todolistReducer, addTodolistAC, changeTodolisTitletAC, changeTodolisFilterAC, setTodolistsAC } from './todolist-reducer';
import { v1 } from "uuid";
import { TasksStateType } from '../../types/tasksTypes';
import { TodolistFilterType, TodolistWithFilterType } from '../../types/todolistsTypes';
let todoListID1 = v1()
let todoListID2 = v1()
let startState: TodolistWithFilterType[] = []
beforeEach(() => {
    startState = [
        { id: todoListID1, title: 'todolist-1', filter: 'all', addedDate: '', order: 0 },
        { id: todoListID2, title: 'todolist-2', filter: 'all', addedDate: '', order: 0 }
    ]
})


test.skip('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, removeTodolistAC(todoListID1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)
})

test.skip('correct todolist should be added', () => {
    const newTodolistTitle = 'New Todolist'
    const endState = todolistReducer(startState, addTodolistAC({
        id: v1(),
        title: newTodolistTitle,
        addedDate: '',
        order: 0
    }))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})
test.skip('correct filter of todolist should be changed', () => {
    const newTodolistTitle = 'New Todolist'
    const endState = todolistReducer(startState, changeTodolisTitletAC(todoListID2, newTodolistTitle))
    expect(endState[0].title).toBe('todolist-1')
    expect(endState[1].title).toBe(newTodolistTitle)
})
test.skip('correct filter of todolist should be changed', () => {
    const newFilter: TodolistFilterType = 'completed'
    const endState = todolistReducer(startState, changeTodolisFilterAC(todoListID2, newFilter))
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})

test.skip('ids should be equals', () => {
    const startTaskSatate: TasksStateType = {}
    const startTodolistState: TodolistWithFilterType[] = []
    const action = addTodolistAC({
        id: v1(),
        title: "NEW-TODOLIST",
        addedDate: '',
        order: 0
    })
    const endTasksState = tasksReducer(startTaskSatate, action)
    const endTodolistState = todolistReducer(startTodolistState, action)
    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolist = endTodolistState[0].id
    expect(idFromTasks).toBe(idFromTodolist)

})
test.skip('todolist should be set to the state', () => {
    const title = 'New Todolist -  test.skip Title'
    const testState = todolistReducer(startState, addTodolistAC({
        id: v1(),
        title,
        addedDate: '',
        order: 0
    }))
    const action = setTodolistsAC(testState)
    const endState = todolistReducer([], action)
    expect(endState.length).toBe(3)
    expect(endState[0].filter).toBe('all')
    expect(endState[0].title).toBe(title)
    expect(endState[1].filter).toBe('all')
    expect(endState[1].title).toBe('todolist-1')
    expect(endState[2].filter).toBe('all')
    expect(endState[2].title).toBe('todolist-2')
})  