import { action } from "@storybook/addon-actions";
import { ComponentStory, Meta } from "@storybook/react";
import { EditableSpan } from "./EditebleSpan";


export default {
    title: "Todolist/EditableSpan",
    component: EditableSpan,
    argTypes: {
        callback: {
            discription: 'Value changed'
        },
        value: {
            defaultValue: 'EditableSpanExample!',
            discription: 'Start value EditableSpan'
        },

    },
    args: {
        callback: action('EditableSpan')
    }
}
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;
export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {

}