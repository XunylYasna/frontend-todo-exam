import React, { Dispatch, useRef, useState, useEffect } from "react";

import {
    deleteTodo,
    updateTodoStatus,
    editTodo,
    UPDATE_TODO_STATUS,
    DELETE_TODO,
    EDIT_TODO,
} from '../../store/actions';
import { isTodoCompleted } from '../../utils';
import { Todo } from "../../models/todo"
import Service from "../../service";
import './styles.css';

interface ToDoItemProps {
    todo: Todo;
    dispatch:
    Dispatch<{
        type: typeof UPDATE_TODO_STATUS,
        payload: {
            todoId: string,
            checked: boolean
        }
    } | {
        type: typeof DELETE_TODO,
        payload: string
    } | {
        type: typeof EDIT_TODO,
        payload: Todo
    }>
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, dispatch }) => {

    const itemRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [editable, setEditable] = useState(false);

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (itemRef.current && !itemRef.current.contains(event.target)) {
                setEditable(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [itemRef])

    const onDoubleClick = () => {
        setEditable(true)
    }

    const onEditTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            const resp = await Service.editTodo(todo, inputRef.current.value)
            dispatch(editTodo(resp))
            setEditable(false)
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onDeleteTodo = (todoId: string) => {
        dispatch(deleteTodo(todoId))
    }

    const shortenContent = (content: String) => {
        let treshhold = 25;
        if (window.innerWidth > 400)
            treshhold = 40
        if (window.innerWidth > 700)
            treshhold = 50
        if (window.innerWidth > 900)
            treshhold = 60

        if (content.length > treshhold) {
            return content.slice(0, treshhold) + '...'
        }
        return content.slice(0, treshhold);
    }

    return (
        <div className="ToDo__item" ref={itemRef} onDoubleClick={onDoubleClick}>
            <div className="ToDo__item__content">
                <input
                    type="checkbox"
                    className="ToDo__checkbox"
                    checked={isTodoCompleted(todo)}
                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                    id={todo.id}
                />

                {editable ?
                    <div className="ToDo__Edit">
                        <input type="text"
                            defaultValue={todo.content}
                            ref={inputRef}
                            onKeyDown={onEditTodo}
                        />
                        <span></span>
                    </div>
                    :
                    <div>
                        <label
                            // htmlFor={todo.id}
                            className={isTodoCompleted(todo) ? "ToDo__item__label completed" : "ToDo__item__label"}
                        >
                            {shortenContent(todo.content)}
                        </label>
                    </div>
                }
            </div>

            <button
                className="Todo__delete__button"
                onClick={() => onDeleteTodo(todo.id)}
            >
                <div className="trash"></div>
            </button>
        </div>
    );
}

export default ToDoItem;