import { tasksReducer } from './../tasksReducer/tasksReducer';
import { TasksStateType } from './../../App';
import { removeTodolistAC, todolistReducer, TodolistType, addTodolistAC, changeTodolisTitletAC, FilterValueType, changeTodolisFilterAC } from './todolist-reducer';
import { v1 } from "uuid";
let todoListID1 = v1()
let todoListID2 = v1()
let startState: TodolistType[] = []
beforeEach(() => {
    startState = [
        { id: todoListID1, title: 'todolist-1', filter: 'all' },
        { id: todoListID2, title: 'todolist-2', filter: 'all' }
    ]
})


test.skip('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, removeTodolistAC(todoListID1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)
})

test.skip('correct todolist should be added', () => {
    const newTodolistTitle = 'New Todolist'
    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))
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
    const newFilter: FilterValueType = 'completed'
    const endState = todolistReducer(startState, changeTodolisFilterAC(todoListID2, newFilter))
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})

test.skip('ids should be equals', () => {
    const startTaskSatate: TasksStateType = {}
    const startTodolistState: TodolistType[] = []
    const action = addTodolistAC("NEW-TODOLIST")
    const endTasksState = tasksReducer(startTaskSatate, action)
    const endTodolistState = todolistReducer(startTodolistState, action)
    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolist = endTodolistState[0].id
    expect(idFromTasks).toBe(action.todolistID)
    expect(idFromTodolist).toBe(action.todolistID)
    expect(idFromTasks).toBe(idFromTodolist)

})
