import {TodoItem as TodoItemType, TodoItemProps} from "@/types";
import {IoAdd, IoClose, IoTrash} from "react-icons/io5";
import React from "react";
import {useTodoList} from "@/hooks/useTodoList";

type TodoListNewProps = {
  newTodoListInput: string;
  handleSetNewTodoListInput: (input: string) => void;
  handleAddTodoList: () => void;
}

export const TodoListNew = ({handleSetNewTodoListInput, handleAddTodoList, newTodoListInput}: TodoListNewProps) => {
  useTodoList();
  return (
    <div className="bg-white rounded shadow p-6 m-4">
      <div className="mb-4">
        <h1 className="text-grey-darkest">Add New TodoList</h1>
        <div className="flex flex-col gap-y-2 mt-4">
          <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                 placeholder="Todolist name"
                 onChange={(e) => handleSetNewTodoListInput(e.target.value)}
                 value={newTodoListInput}
                 onKeyUp={(event) => {
                   if (event.key === 'Enter') handleAddTodoList();
                 }}
          />
          <button
            onClick={() => handleAddTodoList()}
            className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-black hover:bg-teal flex items-center justify-center">
            <IoAdd size="20px" color="gray"/>
            <span>Add </span>
          </button>
        </div>
      </div>
    </div>
  )
}
