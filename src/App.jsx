import React from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import useTheme from './hooks/useTheme';
import './App.css';

export default function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <h1>To-Do List</h1>
        <button onClick={toggleTheme} className="btn-toggle">
          Toggle Theme
        </button>
      </header>
      {/* Передаём тему */}
      <TodoForm theme={theme} />
      <TodoList theme={theme} />
    </div>
  );
}
