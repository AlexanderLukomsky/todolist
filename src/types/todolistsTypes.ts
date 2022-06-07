export type TodolistWithFilterType = TodolistType & { filter: TodolistFilterType }
export type TodolistFilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string,
    addedDate: string,
    order: number
}

