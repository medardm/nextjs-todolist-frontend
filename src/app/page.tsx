'use client'
import React from "react";
import {TodoList} from "@/components/todolist/TodoList";
import {useTodoList} from "@/hooks/useTodoList";

export default function Home() {

  const { todoLists } = useTodoList()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="min-h-100 w-full flex flex-wrap items-start bg-teal-lightest container">
        {
          todoLists.map(
            todoList =>
              <TodoList
                key={todoList.id}
                id={todoList.id}
                title={todoList.title}
              />
          )
        }
      </div>
    </main>
  );
}

