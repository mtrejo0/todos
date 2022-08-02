import { Stack } from "@mui/material";
import { onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Todos from "../../models/Todos";
import { Todo } from "../../types/types";
import TodoListItem from "./TodoListItem";
import { auth } from "../../config/firebase";

function TodosList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (!auth.currentUser || !auth.currentUser?.uid) return;
    const q = query(
      Todos.todosCollection,
      where("uid", "==", auth.currentUser?.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    return () => unsubscribe();
  }, [setTodos]);

  return (
    <Stack spacing={1} sx={{ padding: "0 32px" }}>
      {todos.map((each, i) => (
        <TodoListItem key={i} todo={each}></TodoListItem>
      ))}
    </Stack>
  );
}
export default TodosList;
