import { addTaskAC, removeTaskAC, setTasksAC, tasksReducer, updateTaskAC } from './tasksReducer';

import { addTodolistAC, setTodolistsAC, todolistReducer } from '../todolistReducer/todolist-reducer';
import { TaskPriorities, TasksStateType, TaskStatuses } from '../../types/tasksTypes';
import { v1 } from 'uuid';
let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
        "todoListID1": [
            { id: '1', title: 'HTML', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '' },
            { id: '2', title: 'SCSS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '' },
            { id: '3', title: 'ReactJS', status: TaskStatuses.NotCompleted, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '' },
        ],
        "todoListID2": [
            { id: '1', title: 'HTML-2', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '' },
            { id: '2', title: 'SCSS-2', status: TaskStatuses.NotCompleted, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '' },
            { id: '3', title: 'ReactJS-2', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '' },
        ]
    }
})

test.skip('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("todoListID2", '2')
    const endState = tasksReducer(startState, action)
    expect(endState).toEqual({
        "todoListID1": [
            { id: '1', title: 'HTML', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '' },
            { id: '2', title: 'SCSS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '' },
            { id: '3', title: 'ReactJS', status: TaskStatuses.NotCompleted, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '' },
        ],
        "todoListID2": [
            { id: '1', title: 'HTML-2', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '' },
            { id: '3', title: 'ReactJS-2', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '' },
        ]
    })
})

test.skip('correct task should be added from correct array', () => {
    const action = addTaskAC(
        {
            id: '1', title: 'test.skip-TASK',
            status: TaskStatuses.NotCompleted,
            description: '',
            priority: TaskPriorities.Low, startDate: '',
            deadline: '',
            todoListId: "todoListID2",
            order: 0,
            addedDate: ''
        }
    )
    const endState = tasksReducer(startState, action)
    expect(endState["todoListID2"].length).toBe(4)
    expect(endState["todoListID1"].length).toBe(3)
    expect(endState["todoListID2"][0].title).toBe('test.skip-TASK')
    expect(endState["todoListID2"][0].id).toBeDefined()
    expect(endState["todoListID2"][0].status).toBe(TaskStatuses.NotCompleted)
})
test.skip('status of specified task should be changed', () => {
    const action = updateTaskAC("todoListID2", '2', { status: TaskStatuses.Completed })
    const endState = tasksReducer(startState, action)
    expect(endState["todoListID1"][1].status).toBe(TaskStatuses.Completed)
    expect(endState["todoListID2"][1].status).toBe(TaskStatuses.Completed)
    expect(endState["todoListID2"][1].title).toBe('SCSS-2')
})
test.skip('title of specified task should be changed', () => {
    const action = updateTaskAC("todoListID2", '2', { title: 'new-title' })
    const endState = tasksReducer(startState, action)
    expect(endState["todoListID1"][1].title).toBe('SCSS')
    expect(endState["todoListID2"][1].title).toBe('new-title')
})
test.skip('new array should be added when new todolist is added', () => {
    const action = addTodolistAC({
        id: v1(),
        title: '',
        addedDate: '',
        order: 0
    })
    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== "todoListID1" && k !== "todoListID2")
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(endState[newKey]).toBeDefined()
    expect(keys.length).toBe(3)
})

test.skip('empty array should be added when we set todolist', () => {
    const title = 'New Todolist - test.skip Title'
    const testState = todolistReducer([
        { id: '1', title: 'todolist-1', filter: 'all', addedDate: '', order: 0 },
        { id: '2', title: 'todolist-2', filter: 'all', addedDate: '', order: 0 }
    ], addTodolistAC({
        id: v1(),
        title,
        addedDate: '',
        order: 0
    }))
    const action = setTodolistsAC(testState)
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(3)
    expect(keys[0]).toBe('1')
    expect(keys[1]).toBe('2')
    expect(keys.length).toBe(3)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test.skip('tasks should be added for correct todolist', () => {
    const action = setTasksAC(startState["todoListID1"], "todoListID1")
    const endState = tasksReducer({
        "todoListID2": [],
        "todoListID1": []
    }, action)

    expect(endState["todoListID1"].length).toBe(3)
    expect(endState["todoListID2"].length).toBe(0)
    expect(endState["todoListID2"]).toStrictEqual([])
})  