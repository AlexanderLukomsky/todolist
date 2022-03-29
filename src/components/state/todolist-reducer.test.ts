import { removeTodolistAC, todolistReducer, TodolistType, addTodolistAC, changeTodolisTitletAC, FilterValueType, changeTodolisFilterAC } from './todolist-reducer';
import { v1 } from "uuid";

export const a = '';
test.skip('correct todolist should be removed', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()
    const stareState: TodolistType[] = [
        { id: todoListID1, title: 'todolist-1', filter: 'all' },
        { id: todoListID2, title: 'todolist-2', filter: 'all' }
    ]
    const endState = todolistReducer(stareState, removeTodolistAC(todoListID1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)
})

test.skip('correct todolist should be added', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()
    const newTodolistTitle = 'New Todolist'
    const stareState: TodolistType[] = [
        { id: todoListID1, title: 'todolist-1', filter: 'all' },
        { id: todoListID2, title: 'todolist-2', filter: 'all' }
    ]
    const endState = todolistReducer(stareState, addTodolistAC('new-todolist', newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})
test.skip('correct filter of todolist should be changed', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()
    const newTodolistTitle = 'New Todolist'
    const stareState: TodolistType[] = [
        { id: todoListID1, title: 'What to learn', filter: 'all' },
        { id: todoListID2, title: 'todolist-2', filter: 'all' }
    ]
    const endState = todolistReducer(stareState, changeTodolisTitletAC(todoListID2, newTodolistTitle))
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})
test('correct filter of todolist should be changed', () => {
    const todoListID1 = v1()
    const todoListID2 = v1()
    const newFilter: FilterValueType = 'completed'
    const stareState: TodolistType[] = [
        { id: todoListID1, title: 'What to learn', filter: 'all' },
        { id: todoListID2, title: 'todolist-2', filter: 'all' }
    ]

    const endState = todolistReducer(stareState, changeTodolisFilterAC(todoListID2, newFilter))
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})