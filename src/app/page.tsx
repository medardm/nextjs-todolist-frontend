'use client'
import React from "react";
import {TodoList} from "@/components/organisms/todo/TodoList";
import {useTodoList} from "@/hooks/useTodoList";
import {TodoListNew} from "@/components/organisms/todo/TodoListNew";
import useAuthStore from "@/stores/useAuthStore";
import useTodoItemStore from "@/stores/useTodoItemStore";

export default function Home() {
  const {user} = useAuthStore()
  const {
    todoLists,
    newTodoListInput,
    handleSetNewTodoListInput,
    handleAddTodoList,
    handleRemoveTodoList
  } = useTodoList()

  const {todoItems} = useTodoItemStore()

  const todoListNewProps = {
    newTodoListInput,
    handleSetNewTodoListInput,
    handleAddTodoList
  }
  return (
    <main className="flex min-h-screen flex-col items-center py-3">
      <header className="">
        <h1 className="text-2xl">
          Hi {user?.user.username ?? 'Guest'}, You have {todoLists.length} todo lists{todoLists.length>1? 's': ''}
          and {todoItems.length} todo items
        </h1>
      </header>
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

