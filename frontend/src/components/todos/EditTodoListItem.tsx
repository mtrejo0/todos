import { Todo } from "../../types/types";
import Todos from "../../models/Todos";
import { Box, Button, Card, Checkbox, Stack, TextField } from "@mui/material";

import { useEffect, useState } from "react";
import { EventBus } from "../../event-bus/event-bus";

import SaveIcon from "@mui/icons-material/Save";
import TagsInput from "./TagsInput";
import { taskValidationSchema } from "./AddTodos";

import { useFormik } from "formik";

interface PropsTypes {
  todo: Todo;
}

function TodoListItem({ todo }: PropsTypes) {
  const [newDone, setNewDone] = useState(todo.done);
  const [newTags, setNewTags] = useState(todo.tags);

  const formik = useFormik({
    initialValues: {
      task: todo.task,
    },
    validationSchema: taskValidationSchema,
    onSubmit: (values: any) => {
      EventBus.getInstance().dispatch<string[]>(`save-todo-${todo.id}`);
      Todos.update(todo, {
        task: formik.values.task,
        tags: newTags,
        done: newDone,
      });
    },
  });

  useEffect(() => {
    EventBus.getInstance().register(`save-todo-${todo.id}`, () => {});
  });

  return (
    <Card sx={{ padding: "16px" }}>
      <form onSubmit={formik.handleSubmit}>
        <Stack>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Stack direction="row">
              <Checkbox
                checked={newDone}
                onClick={() => setNewDone((s) => !s)}
              ></Checkbox>
              <Stack sx={{ width: { sm: "100%", md: "500px" } }}>
                <TextField
                  id="task"
                  value={formik.values.task}
                  onChange={formik.handleChange}
                  error={formik.touched.task && Boolean(formik.errors.task)}
                  helperText={formik.touched.task && formik.errors.task}
                ></TextField>
                <TagsInput
                  placeholder="Edit Tags"
                  tags={todo.tags}
                  selectedTags={(tags: string[]) => setNewTags(tags)}
                  style={{ width: "100%" }}
                  variant={"outlined"}
                />
              </Stack>
            </Stack>
            <Button type="submit" variant="contained" sx={{ height: "32px" }}>
              <SaveIcon />
            </Button>
          </Box>
        </Stack>
      </form>
    </Card>
  );
}
export default TodoListItem;
