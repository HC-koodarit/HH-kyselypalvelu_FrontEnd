import React, { useState } from 'react';

function Etusivu() {
  const [todo, setTodo] = useState({ description: "", date: "" });
  const [todos, setTodos] = useState([]);

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  }

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
  }

  function deleteTodo(index) {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  return (
    <div>
      <p>Add todo:</p>
      <label>Description: </label>
      <input name="description" type="text" onChange={inputChanged} value={todo.description} />
      <label>Date: </label>
      <input name="date" type="text" onChange={inputChanged} value={todo.date} />
      <button onClick={addTodo}>Add</button>
      <TodoTable todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
};

export default Etusivu;