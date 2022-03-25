import { KeyboardEvent, ChangeEvent, useState } from "react"
import style from '../Todolist/Todolist.module.scss'
type AddItemFormType = {
    callback: (title: string) => void
}
export const AddItemForm = (props: AddItemFormType) => {
    const [errorStyle, setErrorStyle] = useState<string | null>(null)
    const [titleValue, setTitleValue] = useState('')
    const onClickHandler = () => {
        if (titleValue.trim() !== "") {
            props.callback(titleValue.trim())
            setTitleValue('')
            return
        }
        setErrorStyle('Title is required')
        setTitleValue('')
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => { setTitleValue(e.currentTarget.value) }
    const inputOnKeyPressHanler = (e: KeyboardEvent<HTMLInputElement>) => {
        setErrorStyle(null)
        e.key === 'Enter' && onClickHandler()
    }
    return (
        <div>
            <input className={errorStyle ? style.error : ''} value={titleValue} onChange={onChangeInputHandler} onKeyPress={inputOnKeyPressHanler} />
            <button onClick={onClickHandler}>+</button>
            {errorStyle && <div className={style.error_message}>{errorStyle}</div>}
        </div>
    )
}