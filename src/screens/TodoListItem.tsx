import { Todo } from "../types/types";
import Todos from "../models/Todos"
import { Button, Card, Checkbox, Chip, Grid } from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";

interface PropsTypes {
  todo?: Todo
}

function TodoListItem({ todo }: PropsTypes) {

  const [edit, setEdit] = useState(false)

  const deleteTodo = () => {
    Todos.delete(todo!.id!)
  }

  const editTodo = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const newValue = (e.target as HTMLInputElement).checked
    Todos.update(todo!, { done: newValue })
  }

  const toggleEdit = () => {
    setEdit(!edit)
  }

  return (
    <Card sx={{ padding: "16px" }}>
      <Grid container spacing={12}>
        <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox checked={todo?.done} onClick={editTodo}></Checkbox>
          <p>{todo?.task}</p>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
          <Button onClick={deleteTodo} variant="contained"><DeleteIcon /></Button>
          <Button onClick={toggleEdit} variant="contained" ><EditIcon /></Button>
        </Grid>
      </Grid>
      <Grid container spacing={12}>
        <Grid item xs={12}>
          <Chip label="Chip Filled" />
          <Chip label="Chip Filled" />
          <Chip label="Chip Filled" />
        </Grid>
      </Grid>
    </Card>
  );
}
export default TodoListItem;