import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  EDIT_TODO
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos,action.payload] // Fix to prevent mutation
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: state.todos
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const deleteTodo = [...state.todos]
      const index1 = deleteTodo.findIndex((todo) => todo.id === action.payload);
      deleteTodo.splice(index1, 1);
      return {
        ...state,
        todos: deleteTodo
      }

    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    
    case SET_TODO:
      return {
        ...state,
        todos: action.payload
      }
    
    case EDIT_TODO:
      const editTodo = [...state.todos]
      const index3 = editTodo.findIndex((todo) => todo.id === action.payload.id);
      editTodo[index3] = action.payload
      return{
        ...state,
        todos: editTodo
      }

    default:
      return state;
  }
}

export default reducer;