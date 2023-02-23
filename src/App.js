
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddTodo } from './Components/AddTodo';
import { TodoLists } from './Components/TodoLists';

const App = () => {
  return (
    <div className="container p-4 mt-2">
      <h2>Todo Application</h2>
      <AddTodo />
      <TodoLists />
    </div>
  );
}

export default App;