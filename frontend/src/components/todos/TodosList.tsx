import { Card, Stack, TextField, Typography } from "@mui/material";
import { onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Todos from "../../models/Todos";
import { Todo } from "../../types/types";
import TodoListItem from "./TodoListItem";
import { auth } from "../../config/firebase";
import TagsInput from "./TagsInput";

function TodosList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [searchTags, setSearchTags] = useState<string[]>([]);

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

  const getDisplayTodos = () => {
    let displayTodos = todos.filter((each) => each.task.includes(keyword));

    if (searchTags.length > 0)
      displayTodos = displayTodos.filter((each) =>
        each.tags.some((tag) => searchTags.includes(tag))
      );

    return displayTodos;
  };

  return (
    <Stack spacing={1} sx={{ padding: "0 32px" }}>
      <Card sx={{ padding: "16px" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1}
          alignItems="center"
        >
          <Typography>Sort By: </Typography>
          <TextField
            label="Keyword"
            value={keyword}
            onChange={(e: any) => setKeyword(e.target.value)}
          />
          <TagsInput
            placeholder="Add Tags"
            selectedTags={(newTags: string[]) => setSearchTags(newTags)}
            style={{ width: "100%" }}
            variant={"outlined"}
          />
        </Stack>
      </Card>

      <Typography variant="h5">TODOs:</Typography>

      {todos.length === 0 ? (
        <Typography>You have no todos add some!</Typography>
      ) : (
        getDisplayTodos().length === 0 && (
          <Typography>This search has 0 results</Typography>
        )
      )}
      {getDisplayTodos().map((each, i) => (
        <TodoListItem key={i} todo={each}></TodoListItem>
      ))}
    </Stack>
  );
}
export default TodosList;
