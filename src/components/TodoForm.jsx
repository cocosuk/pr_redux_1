import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todos/todoSlice';
import { FaPlus } from 'react-icons/fa';

export default function TodoForm({ theme }) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTodo(text));
    setText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center mb-6 todo-form ${theme}`}
    >
      <input
        type="text"
        placeholder="Добавить новую задачу..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`flex-grow px-4 py-2 text-lg rounded-l-md border focus:outline-none transition ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500'
            : 'bg-white border-gray-300 text-black placeholder-gray-600 focus:ring-blue-400'
        }`}
        autoFocus
      />
      <button
        type="submit"
        className={`ml-4 flex items-center justify-center px-4 py-2 border-none text-2xl cursor-pointer transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-transparent text-red-400 hover:text-red-600 focus:outline-none'
            : 'bg-transparent text-red-500 hover:text-red-700 focus:outline-none'
        }`}
        title="Добавить задачу"
      >
        <FaPlus />
      </button>
    </form>
  );
}
