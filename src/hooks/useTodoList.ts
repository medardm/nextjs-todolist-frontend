import { useEffect } from 'react';
import useTodoListStore from "@/stores/useTodoListStore";
import {useAuth} from "@/hooks/useAuth";

export function useTodoList() {
  const {
    todoLists,
    newTodoListInput,
    initGuestTodoList,
    fetchTodoLists,
    setNewTodoListInput,
    addTodoList,
    deleteTodoList,
    updateTodoList
  } = useTodoListStore();

  const { user } = useAuth()

  useEffect(() => {
    if (user?.user) {
      fetchTodoLists()
    } else {
      initGuestTodoList()
    }
  }, [fetchTodoLists, initGuestTodoList, user?.user]);

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
    todoLists,
    newTodoListInput,
    handleSetNewTodoListInput,
    handleAddTodoList,
    handleRemoveTodoList,
    handleUpdateTodoList
  };
}
