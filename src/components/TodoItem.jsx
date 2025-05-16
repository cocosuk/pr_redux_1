import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, editTodo } from '../redux/todos/todoSlice';
import { FaTrash } from 'react-icons/fa';

export default function TodoItem({ todo, theme }) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef(null);

  // Фокус на input при входе в режим редактирования
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed) {
      dispatch(editTodo({ id: todo.id, text: trimmed }));
      setIsEditing(false);
    } else {
      // если пустой текст — не сохраняем, возвращаем оригинал
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };

  const isDark = theme === 'dark';

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        borderBottom: `1px solid ${isDark ? '#444' : '#ddd'}`,
        borderRadius: '8px',   // <-- вот это свойство для скругления
        marginBottom: '0.5rem' 
      }}
    >
      {/* Чекбокс */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
        style={{
          marginRight: '1rem',
          cursor: 'pointer',
          width: '18px',
          height: '18px',
        }}
        aria-label="Выполнить задачу"
      />

      {/* Текст задачи или поле редактирования */}
      {isEditing ? (
        <input
          ref={inputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          style={{
            flexGrow: 1,
            fontSize: '1.1rem',
            padding: '0.3rem 0.5rem',
            borderRadius: '6px',
            border: `1px solid ${isDark ? '#555' : '#aaa'}`,
            outline: 'none',
            backgroundColor: isDark ? '#333' : '#fff',
            color: isDark ? '#eee' : '#111',
          }}
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          style={{
            flexGrow: 1,
            fontSize: '1.1rem',
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? (isDark ? '#777' : '#999') : (isDark ? '#eee' : '#111'),
            cursor: 'text',
            userSelect: 'text',
          }}
          aria-label={`Задача: ${todo.text}`}
          title="Двойной клик для редактирования"
        >
          {todo.text}
        </span>
      )}

      {/* Кнопка удаления */}
      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        style={{
          background: 'transparent',
          border: 'none',
          color: isDark ? '#f56565' : 'red',
          fontSize: '1.3rem',
          cursor: 'pointer',
          marginLeft: '1rem',
          transition: 'color 0.2s ease',
        }}
        aria-label="Удалить задачу"
        onMouseEnter={e => e.currentTarget.style.color = isDark ? '#fc8181' : '#ff4c4c'}
        onMouseLeave={e => e.currentTarget.style.color = isDark ? '#f56565' : 'red'}
      >
        <FaTrash />
      </button>
    </li>
  );
}
