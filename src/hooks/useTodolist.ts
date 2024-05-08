import { useEffect } from 'react';
import useTodoStore from "@/stores/useTodoStore";

export function useTodolist() {
  const {
    todos,
    newTodoInput,
    setNewTodoInput,
    addTodo,
    deleteTodo,
    toggleDone,
    clearFinished
  } = useTodoStore();

  useEffect(() => {
    console.log(todos)
    // const payload: any[] = []
    // Not sure where payload data comes from. Maybe you want to fetch it here?
    // fetchTodoSuccess(payload);
  }, []);

  const handleSetNewTodoInput = (task: string) => {
    setNewTodoInput(task);
  }

  const handleAddTodo = () => {
    console.log(newTodoInput + '- add todo')
    if (newTodoInput) {
      addTodo(newTodoInput);
    }
    setNewTodoInput('');
  };

  const handleRemoveTodo = (id: number) => {
    deleteTodo(id);
    setNewTodoInput('');
  };

  const handleToggleDone = (id: number) => {
    toggleDone(id);
  };

  const handleClearDone = () => {
    clearFinished();
  };

  const remainingTodo = todos.filter((todo: { done: boolean; }) => !todo.done);
  const completedTodo = todos.filter((todo: { done: boolean; }) => todo.done);

  return {
    completedTodo,
    remainingTodo,
    todos, // This is now the todoState
    newTodoInput,
    handleSetNewTodoInput,
    handleAddTodo,
    handleRemoveTodo,
    handleToggleDone,
    handleClearDone
  };
}
