import './style.css';
import { getTodos, setTodos, addTodo, deleteTodo, toggleTodo } from './modules/todos.js';
import { loadTodos, saveTodos } from './modules/storage.js';
import { renderTodos, setFilter } from './modules/ui.js';

// Initialize
setTodos(loadTodos());
renderTodos(getTodos());

// Add todo
document.getElementById('todo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('todo-input');
  if (!input.value.trim()) return;
  addTodo(input.value);
  saveTodos(getTodos());
  renderTodos(getTodos());
  input.value = '';
});

// Toggle and delete (event delegation)
document.getElementById('todo-list').addEventListener('click', (e) => {
  const item = e.target.closest('.todo-item');
  if (!item) return;
  const id = Number(item.dataset.id);

  if (e.target.matches('.todo-checkbox')) {
    toggleTodo(id);
  } else if (e.target.matches('.delete-btn')) {
    deleteTodo(id);
  }
  saveTodos(getTodos());
  renderTodos(getTodos());
});

// Filters
document.querySelector('.filters').addEventListener('click', (e) => {
  if (!e.target.matches('.filter-btn')) return;
  setFilter(e.target.dataset.filter);
  renderTodos(getTodos());
});