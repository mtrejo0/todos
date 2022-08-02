import { Todo } from "../../types/types";
import Todos from "../../models/Todos";
import { TextField } from "@mui/material";

import { useEffect, useState } from "react";
import { EventBus } from "../../event-bus/event-bus";

interface PropsTypes {
  todo: Todo;
}

function TodoListItem({ todo }: PropsTypes) {
  const [newTask, setNewTask] = useState(todo.task);

  const updateTodo = (event: any) => {
    if (event.key === "Enter" && event.target.value !== "") {
      EventBus.getInstance().dispatch<string[]>(`save-todo-${todo.id}`);
    }
  };

  useEffect(() => {
    EventBus.getInstance().register(`save-todo-${todo.id}`, () => {
      Todos.update(todo, { task: newTask });
    });
  });

  return (
    <TextField
      onKeyDown={(event) => updateTodo(event)}
      onChange={(event) => setNewTask(event.target.value)}
      value={newTask}
    ></TextField>
  );
}
export default TodoListItem;
