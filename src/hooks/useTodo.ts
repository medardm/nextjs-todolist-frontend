import { useEffect } from 'react';
import useTodoStore from "@/stores/useTodoStore";
import {TodoItemInput} from "@/types";

export function useTodo(todolist: number) {
  const {
    todos,
    newTodoInput,
    setNewTodoInput,
    addTodo,
    deleteTodo,
    toggleDone,
    clearFinished
  } = useTodoStore();

  const todoList = todos.filter((todo) => todo.todolist === todolist);

  useEffect(() => {
    console.log(todos)
    // const payload: any[] = []
    // Not sure where payload data comes from. Maybe you want to fetch it here?
    // fetchTodoSuccess(payload);
  }, []);

  const getNewTodoInput = () => {
    if (newTodoInput && newTodoInput.todolist === todolist) {
      return newTodoInput.title;
    }
    return ''; // or return a default value, your call
  };

  const handleSetNewTodoInput = (todoItemInput: TodoItemInput) => {
    if (todoItemInput.todolist === todolist) {
      setNewTodoInput(todoItemInput);
    }
  }

  const handleAddTodo = () => {
    console.log(newTodoInput + '- add todo')
    if (newTodoInput) {
      addTodo(newTodoInput);
    }
    setNewTodoInput(undefined);
  };

  const handleRemoveTodo = (id: number) => {
    deleteTodo(id);
    setNewTodoInput(undefined);
  };

  const handleToggleDone = (id: number) => {
    toggleDone(id);
  };

  const handleClearDone = () => {
    clearFinished();
  };

  const remainingTodo = todos.filter((todo: { completed: boolean; }) => !todo.completed);
  const completedTodo = todos.filter((todo: { completed: boolean; }) => todo.completed);

  return {
    completedTodo,
    remainingTodo,
    todos: todoList, // This is now the todoState
    getNewTodoInput,
    handleSetNewTodoInput,
    handleAddTodo,
    handleRemoveTodo,
    handleToggleDone,
    handleClearDone
  };
}
