import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Todos from "../../models/Todos";
import { Button, Card, Stack } from "@mui/material";
import { EventBus } from "../../event-bus/event-bus";
import Center from "../utils/Center";
import { useFormik } from "formik";
import * as yup from "yup";
import { NotificationType } from "../utils/NotificationManager";
import Tags from "./TagsInput";

export const taskValidationSchema = yup.object({
  task: yup.string().required("Task name is required"),
});

function TodoForm({ ...props }) {
  const { autocompleteTags } = props;

  const [tags, setTags] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      task: "",
    },
    validationSchema: taskValidationSchema,
    onSubmit: (values: any) => {
      Todos.add(formik.values.task, tags);
      formik.resetForm();
      setTags([]);
      EventBus.getInstance().dispatch<string>("clear-tags");

      EventBus.getInstance().dispatch<NotificationType>("add-notification", {
        text: "Succesfully added todo!",
        severity: "success",
      });
    },
  });

  useEffect(() => {
    EventBus.getInstance().register("update-tags", (tags: string[]) => {
      setTags(tags);
    });
  }, []);

  return (
    <Center height={"fit-content"}>
      <Card sx={{ padding: "8px", margin: "8px", width: "50vw" }}>
        <Stack style={{ width: "100%" }} spacing={1}>
          <TextField
            id="task"
            label="Add Todo"
            variant="outlined"
            value={formik.values.task}
            onChange={formik.handleChange}
            error={formik.touched.task && Boolean(formik.errors.task)}
            helperText={formik.touched.task && formik.errors.task}
          />
          <Tags
            selectedTags={(newTags: string[]) => {
              setTags(newTags);
            }}
            autocompleteTags={autocompleteTags}
          ></Tags>
          <Button
            variant="contained"
            type="submit"
            sx={{ marginTop: "8px" }}
            onClick={() => formik.handleSubmit()}
          >
            Create Todo
          </Button>
        </Stack>
      </Card>
    </Center>
  );
}
export default TodoForm;
