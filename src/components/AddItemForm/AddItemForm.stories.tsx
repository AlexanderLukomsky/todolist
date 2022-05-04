import { ComponentStory } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import { AddItemForm } from "./AddItemForm";

export default {
    title: "Todolist/AddItemForm",
    argTypes: {
        callback: {
            description: 'callback with param string'
        }
    }
}

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;
export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    callback: action('click')
};
