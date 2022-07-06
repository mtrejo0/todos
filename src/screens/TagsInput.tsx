import { Chip, Grid, TextField } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { EventBus } from '../event-bus/event-bus';

export const TagInput = () => {
  const [tags, setTags] = useState<string[]>([]);


  useEffect(() => {
    EventBus.getInstance().register('clear-tags', () => {
      setTags([]);
    });
  }, [])

  const addTags = (event: any) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
    if (event.key === "Backspace") {
      setTags([...tags.filter(tag => tags.indexOf(tag) !== tags.length - 1)]);
    }
    EventBus.getInstance().dispatch<string>('update-tags', 'tags');
  };

  const removeTags = (index: number) => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    EventBus.getInstance().dispatch<string>('update-tags', 'Luis');
  };

  const TagInput = (
    <Grid spacing={12} container>
        <Grid item xs={12}>
          <TextField onKeyUp={event => addTags(event)} label="Add Tags" style={{ width: "100%" }}></TextField>
        </Grid>
        <Grid item xs={12}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              tabIndex={-1}
              label={tag}
              onDelete={() => removeTags(index)}
            />
          ))}
        </Grid>
    </Grid>
  );

  return TagInput;
};
