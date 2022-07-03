import { Todo } from "../types/types";
import Todos from "../models/Todos"
import { Card, Grid } from "@mui/material";

interface PropsTypes {
  todo?: Todo
}

function TodoListItem({ todo }: PropsTypes) {

  const deleteTodo = () => {
    Todos.delete(todo!.id!)
  }

  return (
    <div>
      <Card sx={{ padding: "16px" }}>
        <Grid spacing={12}>
          <Grid item xs={6}>
            {todo?.task}
          </Grid>
          <Grid item xs={6}>
            <button onClick={deleteTodo}>Delete</button>
          </Grid>
        </Grid>
      </Card>
    </div >
  );
}
export default TodoListItem;