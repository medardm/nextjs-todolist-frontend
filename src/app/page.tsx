'use client'
import React from "react";
import {TodoList} from "@/components/todolist/TodoList";
import {useTodoList} from "@/hooks/useTodoList";
import {TodoListNew} from "@/components/form/TodoListNew";

export default function Home() {

  const {
    todoLists,
    newTodoListInput,
    handleSetNewTodoListInput,
    handleAddTodoList,
    handleRemoveTodoList
  } = useTodoList()

  const todoListNewProps = {
    newTodoListInput,
    handleSetNewTodoListInput,
    handleAddTodoList
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="grid grid-cols-3 min-h-100 w-full bg-teal-lightest container mx-auto">
        {
          todoLists.map(
            todoList =>
              <TodoList
                key={todoList.id}
                id={todoList.id}
                title={todoList.title}
                handleRemoveTodoList={handleRemoveTodoList}
              />
          )
        }
        <TodoListNew
          {... todoListNewProps}
        />
      </div>
    </main>
  );
}

