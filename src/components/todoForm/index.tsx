import React, { useEffect, useReducer, useState } from 'react';

import reducer, { initialState } from '../../store/reducer';
import {
    setTodos,
} from '../../store/actions';
import Service from '../../service';
import { TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';

import ToDoItem from './todoItem';
import ToDoCreate from './todoCreate';
import TodoToolbar from './todoToolbar';

import './styles.css'

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = (history: any) => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [loadTodos, isLoadTodos] = useState(false);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp));
            isLoadTodos(true)
        })()
    }, [])

    useEffect(() => {
        if (loadTodos)
            window.localStorage.setItem('todos', JSON.stringify(todos))
    }, [loadTodos, todos])

    const showTodos = todos.filter((todo) => {
        switch (showing) {
            case TodoStatus.ACTIVE:
                return todo.status === TodoStatus.ACTIVE;
            case TodoStatus.COMPLETED:
                return todo.status === TodoStatus.COMPLETED;
            default:
                return true;
        }
    });

    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    return (
        <div className="ToDo__container">
            <ToDoCreate history={history} dispatch={dispatch} />
            <div className="ToDo__list">
                {
                    showTodos.map((todo, index) => {
                        return (
                            <ToDoItem
                                key={index}
                                todo={todo}
                                dispatch={dispatch}
                            />
                        );
                    })
                }
            </div>
            <TodoToolbar
                numTodos={todos.length}
                activeTodos={activeTodos}
                showing={showing}
                setShowing={setShowing}
                dispatch={dispatch}
            />
        </div>
    );
};

export default ToDoPage;