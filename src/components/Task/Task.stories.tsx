import { action } from "@storybook/addon-actions";
import { ComponentStory } from "@storybook/react";
import { TaskPriorities, TaskStatuses } from "../../types/tasksTypes";
import { Task } from "./Task";

export default {
    title: "Todolist/Task",
    args: {
        removeTask: action('removeTask'),
        editTaskTitleHandler: action('editTaskTitleHandler'),
        onChangeStatusHandler: action('onChangeStatusHandler'),
    }
}
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;
export const TaskIsDoneTrue = Template.bind({});
export const TaskIsDoneFalse = Template.bind({});

TaskIsDoneTrue.args = {
    task: { id: 'taskID', title: 'example-true', status: TaskStatuses.Completed, description: 'string', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '' },
    todolistID: 'todolistID',
};
TaskIsDoneFalse.args = {
    task: { id: 'taskID', title: 'example-false', status: TaskStatuses.NotCompleted, description: 'string', priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: '' },
    todolistID: 'todolistID',
};