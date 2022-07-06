import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Todos from "../models/Todos"
import { TagInput } from "./TagsInput";
import { Card } from "@mui/material";
import { EventBus } from '../event-bus/event-bus';


function TodoForm() {
  const [value, setValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const createTodo = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    Todos.add(value, tags)
    setValue("");
    setTags([]);
    EventBus.getInstance().dispatch<string>('clear-tags');
  };

  useEffect(() => {
    EventBus.getInstance().register('update-tags', (tags: string[]) => {
      setTags(tags);
    });
  }, [])


  return (
    <Card sx={{ padding: "8px", margin: "8px" }}>
      <form onSubmit={createTodo}>
        <TextField
          style={{ width: "100%" }}
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          label="Add Todo"
          variant="outlined"
        />
      </form>
      <TagInput />
    </Card>
  );
}
export default TodoForm;