import { ChangeEvent } from "react"

type CheckboxType = {
    callback: (checked: boolean) => void
    isDone: boolean
    tID: string
}
export const Checkbox = ({ callback, isDone, ...props }: CheckboxType) => {
    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => { callback(e.currentTarget.checked) }
    return (
        <>
            <input type="checkbox" checked={isDone} onChange={changeStatusHandler} />
        </>
    )
}