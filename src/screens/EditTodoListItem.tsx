import { Todo } from "../types/types";
import Todos from "../models/Todos"
import { Button, Card, Grid } from "@mui/material";

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

  const editTodo = () => {
    Todos.delete(todo!.id!)
  }

  const toggleEdit = () => {
    setEdit(!edit)
  }

  return (
    <Card sx={{ padding: "16px", margin: "8px" }}>
      <Grid container spacing={12}>
        <Grid item xs={3}>
            {todo?.task}
          </Grid>
        <Grid item xs={3}>
          <Button onClick={deleteTodo} variant="contained"><DeleteIcon /></Button>
        </Grid>
        <Grid item xs={3} direction="row-reverse">
          <Button onClick={toggleEdit} variant="contained" ><EditIcon /></Button>
        </Grid>
        </Grid>
    </Card>
  );
}
export default TodoListItem;