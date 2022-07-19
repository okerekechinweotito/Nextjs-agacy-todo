import React from "react";
import TodoList from "../components/TodoList";
import TodoInput from "./TodoInput";

/* TodoApp is the single source of truth , function definitions , state declarations and API calls are done here */

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");
  const [storeApiTodo, setStoreApiTodo] = React.useState([]);

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    if (json !== undefined) {
      const loadedTodos = JSON.parse(json);
      let newTodo = todos.concat(loadedTodos);

      if (loadedTodos) {
        setTimeout(() => {
          setTodos(newTodo);
        }, 1000);
      }
    }
  }, []);

  /* Hook Used to set input Focus */

  React.useEffect(() => {
    const todoInput = document.getElementById("todo-input");
    todoInput.focus();
  }, []);

  /* Hook used to synchronize API response with local state*/
  React.useEffect(() => {
    let newTodo = todos.concat(storeApiTodo);
    setTodos(newTodo, ...todos);
  }, [storeApiTodo]);

  /* function used to make a GET request if generate-random todo button is pressed t*/

  const handleGenerateRandomTodo = () => {
    fetch(`https://jsonplaceholder.typicode.com/todos?_start=0&_limit=10`)
      .then((response) => response.json())
      .then((todos) => {
        setStoreApiTodo(todos);
      });
  };

  /* Function used to create new todo */
  function handleSubmit(e) {
    e.preventDefault();
    if (!todo || /^\s*$/.test(todo)) {
      return;
    }

    const newTodo = {
      id: Math.floor(Math.random() * 10000),
      title: todo,
      completed: false,
    };

    const json = JSON.stringify([...todos].concat(newTodo));
    localStorage.setItem("todos", json);

    setTodos([...todos].concat(newTodo));
    setTodo("");

    fetch("https://jsonplaceholder.typicode.com/todos/", {
      method: "POST",
      body: JSON.stringify({
        Id: newTodo.id,
        todo: todo,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((NewTodo) =>
        console.log(`Todo:${newTodo.id} has been created successfully`, NewTodo)
      );
  }

  /* Function for updating todo item */
  function submitEdits(id) {
    if (!editingText || /^\s*$/.test(editingText)) {
      return;
    }
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.title = editingText;
      }
      return todo;
    });
    const json = JSON.stringify(updatedTodos);
    localStorage.setItem("todos", json);
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");

    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        updatedTodo: editingText,
        body: editingText,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((updateTodo) =>
        console.log(`Todo:${id} has been updated successfully`, updateTodo)
      );
  }

  /* Function used to delete todo item */
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    const json = JSON.stringify(updatedTodos);
    localStorage.setItem("todos", json);

    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        response.json();
      })
      .then((deleteToDo) => {
        console.log(
          `ToDo:${id} has been deleted successfully from the server`,
          deleteToDo
        );
      });
  }

  /* Function used to toggle completed checkbox */
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
    const json = JSON.stringify(updatedTodos);
    localStorage.setItem("todos", json);

    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: !todo.completed,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((updateTodo) =>
        console.log(
          `the checkbox of todo:${id} has been switched successfully from the server `,
          updateTodo
        )
      );
  }

  /* Function passed to TodoList which is used to set state */
  const handleSetTodoEditing = (id) => {
    setTodoEditing(id);
  };

  /* Function passed to TodoList which is used to set state */
  const handleSetEditingText = (value) => {
    setEditingText(value);
  };

  /* Function passed to TodoInput which is used to set state */
  const handleSetTodo = (value) => {
    setTodo(value);
  };

  return (
    <div className="todo-app-wrapper">
      <h2>
        Okereke Chinweotito
        <br /> Agacy Inc ToDo
      </h2>

      <div className="todo-main-wrapper">
        <h3>Welcome, Whats the Plan for Today?</h3>

        <TodoInput
          todo={todo}
          handleSubmit={handleSubmit}
          handleSetTodo={handleSetTodo}
          handleGenerateRandomTodo={handleGenerateRandomTodo}
        />

        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          setEditingText={editingText}
          submitEdits={submitEdits}
          todoEditing={todoEditing}
          setTodoEditing={todoEditing}
          deleteTodo={deleteTodo}
          handleSetTodoEditing={handleSetTodoEditing}
          handleSetEditingText={handleSetEditingText}
        />
      </div>
    </div>
  );
};

export default App;
