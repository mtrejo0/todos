import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Todos from "../models/Todos"


function TodoForm() {
  const [value, setValue] = useState("");
  const createTodo = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    Todos.add(value)
    setValue("");
  };
  return (
    <form onSubmit={createTodo}>
      <TextField
        style={{ width: "100%" }}
        id="outlined-basic"
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        label="Add Todo"
        variant="outlined"
      />
    </form>
  );
}
export default TodoForm;