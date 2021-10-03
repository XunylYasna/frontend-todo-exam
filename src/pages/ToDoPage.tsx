import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Layout from '../components/layout';
import TodoForm from '../components/todoForm'

const ToDoPage = ({ history }: RouteComponentProps) => {

    return (
        <Layout>
            <TodoForm history={history} />
        </Layout>
    );
};

export default ToDoPage;