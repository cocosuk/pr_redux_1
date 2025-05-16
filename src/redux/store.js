import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todos/todoSlice';

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('todosState');
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Could not load state from localStorage', e);
    return undefined;
  }
}

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todosState', serializedState);
  } catch (e) {
    console.warn('Could not save state to localStorage', e);
  }
}

const persistedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
