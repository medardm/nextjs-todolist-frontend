import {TodoItem as TodoItemType, TodoItemListProps, TodoItemProps} from "@/types";
import {IoClose} from "react-icons/io5";
import React from "react";

export const TodoItemList = (
  {
    todoItems,
    todoList,
    handleRemoveTodo,
    handleToggleDone
  }: TodoItemListProps) => {
  return (
    <>{
      todoItems.filter((i: TodoItemType) => {
        if (!todoList.showCompleted) return !i.completed;
        return i
      })
        .map((t: TodoItemType) =>
          <TodoItem key={t.id}
                    todoItem={
                      {
                        id: t.id,
                        title: t.title,
                        completed: t.completed,
                        todolist: todoList.id
                      }
                    }
                    handleRemoveTodo={handleRemoveTodo}
                    toggleTodoDone={handleToggleDone}
          />
        )
    }</>
  )
}

export const TodoItem = ({todoItem, toggleTodoDone, handleRemoveTodo}: TodoItemProps) => {
  const doneStyle = todoItem.completed ? 'text-gray-400 line-through' : 'text-gray-900'

  const toggleDone = () => toggleTodoDone(todoItem.id)

  return (
    <div className={"flex justify-between items-center border-b-2"}>
      <div className={`flex items-center py-2 flex-grow  ${doneStyle}`}
           onClick={toggleDone}>
        <input
          checked={todoItem.completed}
          id={"todoItem-" + todoItem.id}
          type="checkbox"
          onChange={() => {
          }}
          className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label htmlFor={"todoItem-" + todoItem.id}
               className="ms-2 text-md font-medium pointer-events-none">{todoItem.title}</label>
      </div>
      <IoClose size="20px" color="gray" className='cursor-pointer' onClick={handleRemoveTodo(todoItem)}/>
    </div>
  );
}
