import { userReducer } from "./use-reducer"

userReducer
test.skip('user reducer should increment only age', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' }
    const endState = userReducer(startState, { type: 'INCREMENT-AGE' })
    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})
test.skip('user reducer should increment only childrenCount', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' }
    const endState = userReducer(startState, { type: 'INCREMENT-CHILDREN-COUNT' })
    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
})

test.skip('user reducer should change name user', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' }
    const newName = 'Alex'
    const endState = userReducer(startState, { type: 'CHANGE-NAME', newName: newName })
    expect(endState.name).toBe('Alex')
})

