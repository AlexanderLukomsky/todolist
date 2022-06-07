import { ChangeEvent } from "react"

type CheckboxType = {
    callback: (checked: boolean) => void
    status: boolean
    tID: string
}
export const Checkbox = ({ callback, status, ...props }: CheckboxType) => {
    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => { callback(e.currentTarget.checked) }
    return (
        <>
            <input type="checkbox" checked={status} onChange={changeStatusHandler} />
        </>
    )
}