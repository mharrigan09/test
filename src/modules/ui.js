let currentFilter = 'all';

export function renderTodos(todos) {
  const list = document.getElementById('todo-list');
  const empty = document.getElementById('empty-state');

  const filtered = todos.filter((t) => {
    if (currentFilter === 'active') return !t.done;
    if (currentFilter === 'done') return t.done;
    return true;
  });

  list.innerHTML = filtered
    .map((t) => `
      <li class="todo-item" data-id="${t.id}">
        <input class="todo-checkbox" type="checkbox"
          ${t.done ? 'checked' : ''} />
        <span class="todo-text ${t.done ? 'done' : ''}">${t.text}</span>
        <button class="delete-btn" title="Delete">✕</button>
      </li>
    `)
    .join('');

  empty.classList.toggle('hidden', filtered.length > 0);
}

export function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
}