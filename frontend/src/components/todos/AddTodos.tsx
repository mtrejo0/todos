import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Todos from "../../models/Todos";
import { TagInput } from "./TagsInput";
import { Button, Card, Stack } from "@mui/material";
import { EventBus } from "../../event-bus/event-bus";
import Center from "../utils/Center";

function TodoForm() {
  const [value, setValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const createTodo = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    Todos.add(value, tags);
    setValue("");
    setTags([]);
    EventBus.getInstance().dispatch<string>("clear-tags");
  };

  useEffect(() => {
    EventBus.getInstance().register("update-tags", (tags: string[]) => {
      setTags(tags);
    });
  }, []);

  return (
    <Center height={"fit-content"}>
      <Card sx={{ padding: "8px", margin: "8px", width: "50vw" }}>
        <Stack direction="row" style={{ width: "100%" }}>
          <Stack style={{ width: "100%" }}>
            <TextField
              value={value}
              onChange={(e: any) => setValue(e.target.value)}
              label="Add Todo"
              variant="outlined"
            />
            <TagInput />
            <Button
              variant="contained"
              onClick={createTodo}
              type="submit"
              sx={{ marginTop: "8px" }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Center>
  );
}
export default TodoForm;
