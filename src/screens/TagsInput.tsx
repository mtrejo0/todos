import { Chip, Grid, TextField } from "@mui/material";
import * as React from "react";
import { useState } from "react";

// import "./styles.scss";

export const TagInput: React.FunctionComponent = () => {
  const [tags, setTags] = useState<string[]>([]);

  const addTags = (event: any) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
    if (event.key === "Backspace") {
      setTags([...tags.filter(tag => tags.indexOf(tag) !== tags.length - 1)]);
    }
  };

  const removeTags = (index: number) => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  };

  const _TagInput = (
    <div className="tags-input">
      <Grid xs={12} container>
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


    </div >
  );

  return _TagInput;
};
