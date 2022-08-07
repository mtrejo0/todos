import { Todo } from "../../types/types";
import Todos from "../../models/Todos";
import { Box, Button, Card, Checkbox, Chip, Stack } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import EditTodoListItem from "./EditTodoListItem";
import { EventBus } from "../../event-bus/event-bus";
import ConfirmActionModal from "../utils/ConfirmActionModal";

interface PropsTypes {
  todo: Todo;
}

function TodoListItem({ todo }: PropsTypes) {
  const [edit, setEdit] = useState(false);

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
      {edit ? (
        <EditTodoListItem todo={todo}></EditTodoListItem>
      ) : (
        <Card sx={{ padding: "16px" }}>
          <Stack>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Stack direction="row">
                <Checkbox checked={todo?.done} onClick={editTodo}></Checkbox>
                <p>{todo?.task}</p>
              </Stack>
              <Stack direction="row" spacing={1}>
                <ConfirmActionModal
                  button={
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ height: "32px" }}
                    >
                      <DeleteIcon />
                    </Button>
                  }
                  callback={() => {
                    Todos.delete(todo!.id!);
                  }}
                />

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
      )}
    </>
  );
}
export default TodoListItem;
