import { TasksType } from "../../TodolistWithoutProps"
import { Checkbox } from "../Checkbox/Checkbox"
import { EditableSpan } from "../EditebleSpan/EditebleSpan"

type PropsType = {
    task: TasksType
    removeTask: (todolistID: string, taskID: string) => void
    onChangeStatusHandler: (todolistID: string, taskID: string, checked: boolean) => void
    editTaskTitleHandler: (taskID: string, title: string) => void
    todolistID: string
}
export const Task = ({
    task,
    todolistID,
    removeTask,
    editTaskTitleHandler,
    onChangeStatusHandler,
    ...props
}: PropsType) => {
    return (
        <li key={task.id} style={task.isDone ? { opacity: '0.5' } : { opacity: '1' }}>
            <button onClick={() => { removeTask(todolistID, task.id) }}>x</button>
            <Checkbox callback={(checked) => { onChangeStatusHandler(todolistID, task.id, checked) }} isDone={task.isDone} tID={task.id} />
            <EditableSpan callback={(title: string) => { editTaskTitleHandler(task.id, title) }} value={task.title} />
        </li>
    )
}