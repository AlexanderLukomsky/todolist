import { TaskStatuses, TaskType } from "../../types/tasksTypes"
import { Checkbox } from "../Checkbox/Checkbox"
import { EditableSpan } from "../EditebleSpan/EditebleSpan"

type PropsType = {
    task: TaskType
    removeTask: (todolistID: string, taskID: string) => void
    changeStatus: (todolistID: string, taskID: string, status: boolean) => void
    editTaskTitleHandler: (taskID: string, title: string) => void
    todolistID: string
}
const taskStatus = (status: TaskStatuses) => {
    switch (status) {
        case TaskStatuses.Completed: return true
        case TaskStatuses.NotCompleted: return false
        default: return false
    }
}
export const Task = ({
    task,
    todolistID,
    removeTask,
    editTaskTitleHandler,
    changeStatus,
    ...props
}: PropsType) => {
    return (
        <li key={task.id} style={task.status === TaskStatuses.Completed ? { opacity: '0.5' } : { opacity: '1' }}>
            <button onClick={() => { removeTask(todolistID, task.id) }}>x</button>
            <Checkbox callback={(status) => { changeStatus(todolistID, task.id, status) }} status={taskStatus(task.status)} tID={task.id} />
            <EditableSpan callback={(title: string) => { editTaskTitleHandler(task.id, title) }} value={task.title} />
        </li>
    )
}