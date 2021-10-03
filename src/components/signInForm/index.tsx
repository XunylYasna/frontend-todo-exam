import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

import Service from '../../service';
import "./styles.css";


const SignInForm = () => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const history = useHistory();

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const resp = await Service.signIn(form.userId, form.password)
            localStorage.setItem('token', resp)
            history.push('/todo')
        }
        catch {
            setInvalidCredentials(true)
        }
    }

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setInvalidCredentials(false)
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <form onSubmit={signIn}>
            <h1>Login</h1>
            <br />

            <div className="group">
                <input
                    className="field-input"
                    id="user_id"
                    name="userId"
                    type="text"
                    value={form.userId}
                    onChange={onChangeField}
                    required
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="field-label" htmlFor="user_id">User ID</label>
            </div>
            <div className="group">
                <input
                    className="field-input"
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={onChangeField}
                    required
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="field-label">Password</label>
            </div>
            {invalidCredentials ?
                <p className="error-message">Invalid Credentials</p> :
                <></>
            }
            <button type="submit" className="learn-more">
                <span className="circle" aria-hidden="true">
                    <span className="icon arrow"></span>
                </span>
                <span className="button-text">Sign in</span>
            </button>
        </form>
    )
}

export default SignInForm