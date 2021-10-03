import React, { Dispatch, SetStateAction } from 'react'

import { TodoStatus } from '../../models/todo';
import {
    toggleAllTodos,
    deleteAllTodos,
    TOGGLE_ALL_TODOS,
    DELETE_ALL_TODOS
} from '../../store/actions';

type EnhanceTodoStatus = TodoStatus | 'ALL';

interface ToDoToolbarProps {
    numTodos: number
    activeTodos: number,
    showing: EnhanceTodoStatus
    setShowing: Dispatch<SetStateAction<EnhanceTodoStatus>>,
    dispatch:
    Dispatch<{
        type: typeof TOGGLE_ALL_TODOS,
        payload: boolean
    } | {
        type: typeof DELETE_ALL_TODOS,
    }>
}

const TodoToolbar: React.FC<ToDoToolbarProps> = ({ numTodos, activeTodos, showing, setShowing, dispatch }) => {

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }


    return (
        <div className="Todo__toolbar">
            {numTodos > 0 ?
                <input
                    className="ToDo__checkbox"
                    type="checkbox"
                    checked={activeTodos === 0}
                    onChange={onToggleAllTodo}
                /> : <div />
            }
            <div className="Todo__tabs">
                <button
                    className={showing === 'ALL' ? "Action__btn active" : "Action__btn"}
                    onClick={() => setShowing('ALL')}>
                    All
                </button>
                <div>|</div>
                <button
                    className={showing === TodoStatus.ACTIVE ? "Action__btn active" : "Action__btn"}
                    onClick={() => setShowing(TodoStatus.ACTIVE)}>
                    Active
                </button>
                <div>|</div>
                <button
                    className={showing === TodoStatus.COMPLETED ? "Action__btn active" : "Action__btn"}
                    onClick={() => setShowing(TodoStatus.COMPLETED)}>
                    Completed
                </button>
            </div>
            <button className="Action__btn clear" onClick={onDeleteAllTodo}>
                Clear all todos
            </button>
        </div>
    )
}

export default TodoToolbar;
