import { ChangeEvent, useState } from "react"

type EditableSpanType = {
    value: string
    callback: (title: string) => void
}
export const EditableSpan = (props: EditableSpanType) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const onDoubleClick = () => {
        setEdit(!edit)
    }
    const onBlurHandler = () => {
        if (title.trim() !== "") {
            props.callback(title.trim())
        }
        setEdit(!edit)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        !edit ?
            <span onDoubleClick={onDoubleClick}>{props.value}</span> :
            <input type="text" value={title}
                onBlur={onBlurHandler}
                onChange={onChangeHandler}
                autoFocus />
    )
}