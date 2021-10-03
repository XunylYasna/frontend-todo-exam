import React, { FC, Dispatch, useRef } from 'react'

import { createTodo, CREATE_TODO } from '../../store/actions';
import Service from '../../service';
import { Todo } from '../../models/todo';
import './styles.css'

interface ToDoCreate {
    history: any,
    dispatch: Dispatch<{ type: typeof CREATE_TODO, payload: Todo }>
}

const TodoCreate: FC<ToDoCreate> = ({ history, dispatch }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            try {
                const resp = await Service.createTodo(inputRef.current.value);
                dispatch(createTodo(resp));
                inputRef.current.value = '';
            } catch (e) {
                if ((e as any).response.status === 401) {
                    history.push('/')
                }
            }
        }
    }

    return (
        <div className="Todo__group">
            <input
                ref={inputRef}
                className="Todo__input"
                placeholder="What needs to be done?"
                onKeyDown={onCreateTodo}
            />
            <span className="bar"></span>
        </div>
    )
}


export default TodoCreate;
