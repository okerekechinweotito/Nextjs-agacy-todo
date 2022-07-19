import React from "react";

/* TodoInput renders the form && input-box,  and receives the initial user entry which it passes to TodoApp  */
function TodoInput({
  handleSubmit,
  handleSetTodo,
  todo,
  handleGenerateRandomTodo,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        autoFocus
        type="text"
        onChange={(e) => handleSetTodo(e.target.value)}
        value={todo}
        id="todo-input"
      />
      <button type="submit">Add Todo >> </button> <br />
      <button type="submit" onClick={handleGenerateRandomTodo}>
        Generate ToDos from JsonPlaceholder
      </button>
    </form>
  );
}

export default TodoInput;
