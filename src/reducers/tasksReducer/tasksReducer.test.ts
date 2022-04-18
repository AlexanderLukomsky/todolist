import { addTaskAC, changeTaskStatusAC, editTaskTitleAC, removeTaskAC, tasksReducer } from './tasksReducer';
import { TasksStateType } from './../../App';
import { addTodolistAC } from '../todolistReducer/todolist-reducer';
let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
        "todoListID1": [
            { id: '1', title: 'HTML', isDone: true },
            { id: '2', title: 'SCSS', isDone: true },
            { id: '3', title: 'ReactJS', isDone: false },
        ],
        "todoListID2": [
            { id: '1', title: 'HTML-2', isDone: true },
            { id: '2', title: 'SCSS-2', isDone: false },
            { id: '3', title: 'ReactJS-2', isDone: true },
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("todoListID2", '2')
    const endState = tasksReducer(startState, action)
    expect(endState).toEqual({
        "todoListID1": [
            { id: '1', title: 'HTML', isDone: true },
            { id: '2', title: 'SCSS', isDone: true },
            { id: '3', title: 'ReactJS', isDone: false },
        ],
        "todoListID2": [
            { id: '1', title: 'HTML-2', isDone: true },
            { id: '3', title: 'ReactJS-2', isDone: true },
        ]
    })
})

test('correct task should be added from correct array', () => {
    const action = addTaskAC("todoListID2", 'juce')
    const endState = tasksReducer(startState, action)
    expect(endState["todoListID2"].length).toBe(4)
    expect(endState["todoListID1"].length).toBe(3)
    expect(endState["todoListID2"][0].title).toBe('juce')
    expect(endState["todoListID2"][0].id).toBeDefined()
    expect(endState["todoListID2"][0].isDone).toBe(false)
})
test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC("todoListID2", '2', true)
    const endState = tasksReducer(startState, action)
    expect(endState["todoListID1"][1].isDone).toBe(true)
    expect(endState["todoListID2"][1].isDone).toBe(true)
    expect(endState["todoListID2"][1].title).toBe('SCSS-2')
})
test('title of specified task should be changed', () => {
    const action = editTaskTitleAC("todoListID2", '2', 'new-title')
    const endState = tasksReducer(startState, action)
    expect(endState["todoListID1"][1].title).toBe('SCSS')
    expect(endState["todoListID2"][1].title).toBe('new-title')
})
test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC('')
    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== "todoListID1" && k !== "todoListID2")
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(endState[newKey]).toBeDefined()
    expect(keys.length).toBe(3)
})