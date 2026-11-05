const KEY = 'vite-todos';

export function loadTodos() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTodos(todos) {
  localStorage.setItem(KEY, JSON.stringify(todos));
}