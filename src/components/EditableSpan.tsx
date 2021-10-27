import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    callback: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(props.title)
  const editOn = () => {
    setEditMode(true)
  }
    const editOff = () => {
        setEditMode(false)
    }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
      props.callback(title)
  }
    return (
        editMode
            ? <input onChange={onChangeHandler} value={title} onBlur={editOff} autoFocus={true}/>
            : <span onDoubleClick={editOn} >{props.title}</span>
    )
}