import { onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Todos from "../models/Todos"
import { Todo } from "../types/types";
import TodoListItem from "./TodoListItem";


function TodosList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const q = query(Todos.todosCollection)
    onSnapshot(q, (querySnapshot) => {
      setTodos(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })))
    })
  })

  return (
    <div>
      {todos.map((each, i) => <TodoListItem key={i} todo={each}></TodoListItem>)}
    </div>
  );
}
export default TodosList;