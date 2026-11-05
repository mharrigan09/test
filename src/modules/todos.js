let todos = [];

export function getTodos() {
  return todos;
}

export function setTodos(initial) {
  todos = initial;
}

export function addTodo(text) {
  const todo = {
    id: Date.now(),
    text: text.trim(),
    done: false,
  };
  todos.push(todo);
  return todo;
}

export function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
}

export function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) todo.done = !todo.done;
}