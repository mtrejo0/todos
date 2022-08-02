import { Chip, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { EventBus } from "../../event-bus/event-bus";

export const TagInput = () => {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    EventBus.getInstance().register("clear-tags", () => {
      setTags([]);
    });
  }, []);

  const addTags = (event: any) => {
    if (event.key === "Enter" && event.target.value !== "") {
      const newTags = [...tags, event.target.value];
      setTags(newTags);
      event.target.value = "";
      EventBus.getInstance().dispatch<string[]>("update-tags", newTags);
    }
    if (event.key === "Backspace") {
      const newTags = [
        ...tags.filter((tag) => tags.indexOf(tag) !== tags.length - 1),
      ];
      setTags(newTags);
      EventBus.getInstance().dispatch<string[]>("update-tags", newTags);
    }
  };

  const removeTags = (index: number) => {
    setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
    EventBus.getInstance().dispatch<string[]>("update-tags", tags);
  };

  const TagInput = (
    <Stack spacing={1}>
      <TextField
        onKeyDown={(event) => addTags(event)}
        label="Add Tags"
      ></TextField>
      <Stack direction="row" spacing={1}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            tabIndex={-1}
            label={tag}
            onDelete={() => removeTags(index)}
          />
        ))}
      </Stack>
    </Stack>
  );

  return TagInput;
};
