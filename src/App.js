import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);

  function addToDo(newTask) {
    const newTodo = {
      id: crypto.randomUUID(),
      task: newTask,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  }

  function toggleCompleted(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  const completedCount = todos.filter((todo) => todo.completed).length;
  const remainingCount = todos.length - completedCount;

  return (
    <div className="app-container">
      <Header />
      <TodoForm addToDo={addToDo} handleSubmit={handleSubmit} />
      <TodoList
        todos={todos}
        toggleCompleted={toggleCompleted}
        deleteTodo={deleteTodo}
      />
      {todos.length > 0 && (
        <Footer
          completedCount={completedCount}
          remainingCount={remainingCount}
        />
      )}
    </div>
  );
}

function Header() {
  return <h1 className="header">To-Do List</h1>;
}

function TodoForm({ addToDo }) {
  const [inputTodo, setInputTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTask = inputTodo.trim();
    if (!trimmedTask) return;
    addToDo(trimmedTask);
    setInputTodo("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={inputTodo}
        onChange={(e) => setInputTodo(e.target.value)}
      />
      <button
        onClick={() => {
          const trimmedTask = inputTodo.trim();
          if (!trimmedTask) return;
          addToDo(trimmedTask);
          setInputTodo("");
        }}
      >
        Add Task
      </button>
    </form>
  );
}

function TodoList({ todos, toggleCompleted, deleteTodo }) {
  if (todos.length === 0) {
    return <p>Your todo list is empty. Add your tasks above!</p>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          task={todo.task}
          key={todo.id}
          completed={todo.completed}
          toggleCompleted={() => toggleCompleted(todo.id)}
          deleteTodo={() => deleteTodo(todo.id)}
        />
      ))}
    </div>
  );
}

function TodoItem({ task, completed, toggleCompleted, deleteTodo }) {
  return (
    <div className={`todo-item`}>
      <p
        onClick={toggleCompleted}
        style={{
          cursor: "pointer",
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {task}
      </p>
      <button onClick={deleteTodo}>Delete</button>
    </div>
  );
}

function Footer({ completedCount, remainingCount }) {
  return (
    <footer>
      <p>Completed: {completedCount}</p>
      <p>Remaining: {remainingCount}</p>
    </footer>
  );
}
