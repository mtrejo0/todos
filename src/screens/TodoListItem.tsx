import { Todo } from "../types/types";
import Todos from "../models/Todos";
import { Box, Button, Card, Checkbox, Chip, Stack } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

interface PropsTypes {
  todo: Todo;
}

function TodoListItem({ todo }: PropsTypes) {
  const deleteTodo = () => {
    Todos.delete(todo!.id!);
  };

  const editTodo = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const newValue = (e.target as HTMLInputElement).checked;
    Todos.update(todo!, { done: newValue });
  };

  return (
    <Card sx={{ padding: "16px" }}>
      <Stack>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack direction="row">
            <Checkbox checked={todo?.done} onClick={editTodo}></Checkbox>
            <p>{todo?.task}</p>
          </Stack>
          <Button
            onClick={deleteTodo}
            variant="contained"
            sx={{ height: "32px" }}
          >
            <DeleteIcon />
          </Button>
        </Box>
        <Stack direction="row">
          {todo?.tags?.map((each, i) => (
            <Chip label={each} key={i} />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}
export default TodoListItem;
