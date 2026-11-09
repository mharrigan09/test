import { useState, useRef } from 'react';

const STORAGE_KEY = 'vite-todos';

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export default function App() {
  const [todos, setTodos] = useState(loadTodos);
  const [filter, setFilter] = useState('all');
  const inputRef = useRef(null);

  function updateTodos(next) {
    setTodos(next);
    saveTodos(next);
  }

  function handleAdd(e) {
    e.preventDefault();
    const text = inputRef.current.value.trim();
    if (!text) return;
    updateTodos([...todos, { id: Date.now(), text, done: false }]);
    inputRef.current.value = '';
  }

  function handleToggle(id) {
    updateTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function handleDelete(id) {
    updateTodos(todos.filter((t) => t.id !== id));
  }

  const filtered = todos.filter((t) => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  return (
    <div className="app">
      <h1>My Todos</h1>

      <form id="todo-form" onSubmit={handleAdd}>
        <input
          ref={inputRef}
          type="text"
          id="todo-input"
          placeholder="What needs to be done?"
          autoComplete="off"
        />
        <button type="submit">Add</button>
      </form>

      <div className="filters">
        {['all', 'active', 'done'].map((f) => (
          <button
            key={f}
            className={`filter-btn${filter === f ? ' active' : ''}`}
            data-filter={f}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Completed'}
          </button>
        ))}
      </div>

      <ul id="todo-list">
        {filtered.map((t) => (
          <li key={t.id} className="todo-item">
            <input
              className="todo-checkbox"
              type="checkbox"
              checked={t.done}
              onChange={() => handleToggle(t.id)}
            />
            <span className={`todo-text${t.done ? ' done' : ''}`}>{t.text}</span>
            <button className="delete-btn" title="Delete" onClick={() => handleDelete(t.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p id="empty-state">No todos yet. Add one above!</p>
      )}
    </div>
  );
}
