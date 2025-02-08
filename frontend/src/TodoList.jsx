import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const API_URL = "https://mern-stack-todo-app-ten.vercel.app/todos";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios.get(API_URL).then((res) => setTodos(res.data));
  }, []);

  const addTodo = () => {
    if (!task.trim()) return;
    axios.post(API_URL, { task }).then((res) => {
      setTodos([...todos, res.data]);
      setTask("");
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      axios.get(API_URL).then((res) => setTodos(res.data));
    });
  };

  // Toggle Dark Mode
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <div className="container">
      <h1>Full Stack MERN Todo App</h1>
      <h2>To-Do List</h2>

      {/* Input and Button in Same Row */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.task}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Dark Mode Toggle Button */}
      <button className="toggle-mode" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}
