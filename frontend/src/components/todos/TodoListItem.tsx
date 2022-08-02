import { Todo } from "../../types/types";
import Todos from "../../models/Todos";
import { Box, Button, Card, Checkbox, Chip, Stack } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import EditTodoListItem from "./EditTodoListItem";
import { EventBus } from "../../event-bus/event-bus";

interface PropsTypes {
  todo: Todo;
}

function TodoListItem({ todo }: PropsTypes) {
  const [edit, setEdit] = useState(false);
  const deleteTodo = () => {
    Todos.delete(todo!.id!);
  };

  const editTodo = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const newValue = (e.target as HTMLInputElement).checked;
    Todos.update(todo!, { done: newValue });
  };

  useEffect(() => {
    EventBus.getInstance().register(`save-todo-${todo.id}`, () => {
      setEdit(false);
    });
  });

  return (
    <>
      <Card sx={{ padding: "16px" }}>
        <Stack>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Stack direction="row">
              <Checkbox checked={todo?.done} onClick={editTodo}></Checkbox>
              {edit ? (
                <EditTodoListItem todo={todo}></EditTodoListItem>
              ) : (
                <p>{todo?.task}</p>
              )}
            </Stack>
            <Stack direction="row">
              <Button
                onClick={deleteTodo}
                variant="contained"
                sx={{ height: "32px" }}
              >
                <DeleteIcon />
              </Button>
              {edit ? (
                <Button
                  onClick={() =>
                    EventBus.getInstance().dispatch<string[]>(
                      `save-todo-${todo.id}`
                    )
                  }
                  variant="contained"
                  sx={{ height: "32px" }}
                >
                  <SaveIcon />
                </Button>
              ) : (
                <Button
                  onClick={() => setEdit(true)}
                  variant="contained"
                  sx={{ height: "32px" }}
                >
                  <EditIcon />
                </Button>
              )}
            </Stack>
          </Box>
          <Stack direction="row">
            {todo?.tags?.map((each, i) => (
              <Chip label={each} key={i} />
            ))}
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
export default TodoListItem;
