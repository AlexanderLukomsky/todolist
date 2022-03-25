import { Button, TextField } from "@material-ui/core"
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
            <TextField id="standard-secondary" variant="outlined"
                value={titleValue} onChange={onChangeInputHandler} onKeyPress={inputOnKeyPressHanler}
                style={{ maxWidth: '300px', maxHeight: '30px', minWidth: '300px', minHeight: '30px' }}
                size="small"
                color="primary"
                label={errorStyle ? errorStyle : false}
                error={!!errorStyle}
            />
            {/* <input className={errorStyle ? style.error : ''} value={titleValue} onChange={onChangeInputHandler} onKeyPress={inputOnKeyPressHanler} /> */}
            <Button style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                variant="contained" color="primary" onClick={onClickHandler}>+</Button>

        </div>
    )
}

          //*!  {errorStyle && <div className={style.error_message}>{errorStyle}</div>}