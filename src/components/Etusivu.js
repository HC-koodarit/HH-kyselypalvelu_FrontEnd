<<<<<<< HEAD
import React, { useState, useEffect } from 'react';

function Kysely() {
    const [listkysely, setListKysely] = useState([]);
    const [kysely, setKysely] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/kyselyt/1')
        .then(res => res.json())
        .then(items => {
            setListKysely(items)
        })
        .catch(err =>console.error(err))
    }, []);

    return(
        <div>
            <h1>ETUSIVU</h1>
            <p>{listkysely.id}</p>
            <p>{listkysely.nimi}</p>
                {
                listkysely.map((kysely, index) =>
                <ul key={index}>{kysely.kysely.nimi}
                <li>{kysely.kysymysteksti}</li>
                </ul>
                )
                }
            
        </div>
    )
}

export default Kysely;
=======
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
>>>>>>> 2c17c15318f1c611538d714044700c62f7c79074
