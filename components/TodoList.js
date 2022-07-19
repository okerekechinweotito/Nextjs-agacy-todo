import React from "react";

/* TodoList maps through and renders the list of todo items from the API and from user entry. It receives the CRUD methods/actions for manipulating the todo items*/
function TodoList({
  todos,
  toggleComplete,
  submitEdits,
  todoEditing,
  deleteTodo,
  handleSetTodoEditing,
  handleSetEditingText,
}) {
  return (
    <div className="todo-items-wrapper">
      {todos.map((todo) => (
        <div key={todo.id} className="todo-item">
          <div className="todo-text-wrapper">
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <input
                autoFocus
                type="text"
                onChange={(e) => handleSetEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.title}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button type="submit" onClick={() => submitEdits(todo.id)}>
                Submit Edits
              </button>
            ) : (
              <button onClick={() => handleSetTodoEditing(todo.id)}>
                Edit
              </button>
            )}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
