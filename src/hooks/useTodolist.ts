import {useEffect, useReducer, useState} from 'react';
import {todoInitialState, todoReducer} from "@/reducers/todoReducer";

export function useTodolist() {
  const [todoState, dispatchTodo] = useReducer(todoReducer, todoInitialState);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    // const payload: any[] = []
    // dispatchTodo({type: 'FETCH_TODO_SUCCESS', payload: payload});

  }, []);

  const handleAddTodo = () => {
    if (newTodo) {
      dispatchTodo({type: 'ADD_TODO', task: newTodo});
    }
    setNewTodo('');
  };

  const handleRemoveTodo = (id: number) => {
    dispatchTodo({type: 'DELETE_TODO', id: id});
    setNewTodo('');
  };

  const handleToggleDone = (id: number) => {
    dispatchTodo({type: 'TOGGLE_DONE', id});
  };

  const handleClearDone = () => {
    dispatchTodo({type: 'CLEAR_FINISHED'});
  };


  const remainingTodo = todoState.todos.filter(todo => !todo.done);
  const completedTodo = todoState.todos.filter(todo => todo.done);

  return {
    completedTodo,
    remainingTodo,
    todoState,
    newTodo,
    dispatchTodo,
    setNewTodo,
    handleAddTodo,
    handleRemoveTodo,
    handleToggleDone,
    handleClearDone
  };
}
