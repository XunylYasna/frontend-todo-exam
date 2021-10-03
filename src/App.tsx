import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignInPage from './pages/SignInPage';
import ToDoPage from './pages/ToDoPage';
import Cursor from './components/cursor';

import './App.css';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage} />
          <Route path="/todo" component={ToDoPage} />
        </Switch>
      </BrowserRouter>
      <Cursor />
    </main>
  );
}

export default App;
