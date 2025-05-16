import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

export default function TodoList({ theme }) {
  const todos = useSelector((state) => state.todos.items || []);
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="todo-list-container" style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
      <div className="todo-list-column" style={{ flex: 1 }}>
        <h2>Активные задачи</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {activeTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} theme={theme} />
          ))}
        </ul>
      </div>

      <div className="todo-list-column" style={{ flex: 1 }}>
        <h2>Выполненные задачи</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {completedTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} theme={theme} />
          ))}
        </ul>
      </div>
    </div>
  );
}
