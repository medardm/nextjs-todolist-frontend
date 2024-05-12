import { useEffect } from 'react';
import useTodoListStore from "@/stores/useTodoListStore";
import {fetchData} from "@/utils/api";

export function useTodoList() {
  const {
    todoLists,
    newTodoListInput,
    setNewTodoListInput,
    addTodoList,
    deleteTodoList,
    updateTodoList
  } = useTodoListStore();

  useEffect(() => {
    console.log(todoLists)
    // fetchData<>('todolists', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: 'include',
    // }).then(data);
    // const payload: any[] = []
    // fetchTodoListSuccess(payload);
  }, []);

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
