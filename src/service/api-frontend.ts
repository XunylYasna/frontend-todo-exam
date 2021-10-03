import {IAPI} from './types';
import {Todo, TodoStatus} from '../models/todo';
import shortid from 'shortid';

const mockToken = 'testabc.xyz.ahk'

class ApiFrontend extends IAPI {
    async signIn(username: string, password: string): Promise<string>{
        if (username === 'firstUser' && password === 'example') {
            return Promise.resolve(mockToken)
        }

        return Promise.reject('Incorrect username/password')
    }

    async createTodo(content: string): Promise<Todo> {
        return Promise.resolve({
            content: content,
            created_date: new Date().toISOString(),
            status: TodoStatus.ACTIVE,
            id: shortid(),
            user_id: 'firstUser'
        } as Todo);
    }

    async getTodos(): Promise<Todo[]>{
        const todos = window.localStorage.getItem('todos')
        if(todos)
            return JSON.parse(todos)
        else
            return []
    }

    async editTodo(toEdit:Todo, content: String): Promise<Todo>{
        return Promise.resolve({
            content: content,
            created_date: toEdit.created_date,
            status: toEdit.status,
            id: toEdit.id,
            user_id: toEdit.user_id
        } as Todo);
    }
}

export default new ApiFrontend();