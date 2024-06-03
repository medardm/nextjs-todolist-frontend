import { useEffect } from 'react';
import useTodoListStore from "@/state-management/zustand/features/todo/useTodoListStore";
import {useAuth} from "@/state-management/zustand/features/auth/hooks/useAuth";

export function useTodoList() {
  const {
    loading,
    error,
    todoLists,
    newTodoListInput,
    setOnline,
    initGuestTodoList,
    fetchTodoLists,
    setNewTodoListInput,
    addTodoList,
    deleteTodoList,
    updateTodoList,
    toggleShowCompleted
  } = useTodoListStore();

  const { user } = useAuth()

  useEffect(() => {
    if (user?.user) {
      setOnline(true)
      fetchTodoLists()
    } else {
      setOnline(false)
      initGuestTodoList()
    }
  }, [fetchTodoLists, initGuestTodoList, user?.user, setOnline]);

  const handleSetNewTodoListInput = (title: string) => {
    setNewTodoListInput(title);
  }

  const handleAddTodoList = () => {
    if (newTodoListInput) {
      addTodoList(newTodoListInput);
    }
    setNewTodoListInput('');
  };

  const handleRemoveTodoList = (id: number) => {
    deleteTodoList(id);
    setNewTodoListInput('');
  };

  const handleUpdateTodoList = (id: number, title: string) => {
    updateTodoList(id, title);
  };


  return {
    loading,
    error,
    todoLists,
    newTodoListInput,
    handleSetNewTodoListInput,
    handleAddTodoList,
    handleRemoveTodoList,
    handleUpdateTodoList,
    toggleShowCompleted
  };
}
