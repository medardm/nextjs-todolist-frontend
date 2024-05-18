import { useEffect } from 'react';
import useTodoItemStore from "@/stores/useTodoItemStore";
import {TodoItem, TodoItemInput} from "@/types";
import {useAuth} from "@/hooks/useAuth";

export function useTodoItem(todolist: number) {
  const {
    todoItems: todoItemInStore,
    newTodoItemInput,
    setOnline,
    setNewTodoItemInput,
    addTodoItem,
    deleteTodoItem,
    toggleDone,
    clearFinished,
    fetchTodoItems,
    initGuestTodoItems
  } = useTodoItemStore();

  const { user } = useAuth()

  useEffect(() => {
    if (user?.user) {
      fetchTodoItems(todolist)
      setOnline(true)
    } else {
      setOnline(false)
      initGuestTodoItems()
    }
  }, [fetchTodoItems, initGuestTodoItems, user?.user]);

  const todoItems = todoItemInStore.filter((todoItem) => todoItem.todolist === todolist);

  const getNewTodoInput = () => {
    if (newTodoItemInput && newTodoItemInput.todolist === todolist) {
      return newTodoItemInput.title;
    }
    return ''; // or return a default value, your call
  };

  const handleSetNewTodoInput = (todoItemInput: TodoItemInput) => {
    if (todoItemInput.todolist === todolist) {
      setNewTodoItemInput(todoItemInput);
    }
  }

  const handleAddTodo = () => {
    if (newTodoItemInput) {
      addTodoItem(newTodoItemInput);
    }
    setNewTodoItemInput(undefined);
  };

  const handleRemoveTodo = (todoItem: TodoItem) => () => {
    deleteTodoItem(todoItem);
    setNewTodoItemInput(undefined);
  };

  const handleToggleDone = (id: number) => {
    toggleDone(id, todolist);
  };

  const handleClearDone = () => {
    clearFinished();
  };

  const remainingTodo = todoItems.filter((todoItem: { completed: boolean; }) => !todoItem.completed);
  const completedTodo = todoItems.filter((todoItem: { completed: boolean; }) => todoItem.completed);

  return {
    completedTodo,
    remainingTodo,
    fetchTodoItems,
    todoItems,
    getNewTodoInput,
    handleSetNewTodoInput,
    handleAddTodo,
    handleRemoveTodo,
    handleToggleDone,
    handleClearDone
  };
}
