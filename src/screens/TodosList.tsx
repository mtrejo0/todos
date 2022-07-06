import { Box, Grid } from "@mui/material";
import { onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Todos from "../models/Todos"
import { Todo } from "../types/types";
import TodoListItem from "./TodoListItem";

import { db } from "../config/firebase";
import { addDoc, collection, CollectionReference, deleteDoc, doc, setDoc } from "firebase/firestore";


function TodosList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const c = collection(db, "todos") as CollectionReference<Todo>
    const q = query(c)
    const unsubscribe = onSnapshot(c, (querySnapshot) => {
      setTodos(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })))
    })
    return () => unsubscribe()
  }, [todos, setTodos])

  return (
    <Box sx={{ height: "40vh", overflowY: "scroll" }}>
      <Grid spacing={12} container>
        {todos.map((each, i) => <Grid item xs={4} key={i}><TodoListItem todo={each}></TodoListItem></Grid>)}
      </Grid>
    </Box>
  );
}
export default TodosList;