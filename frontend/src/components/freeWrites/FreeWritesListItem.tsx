import { FreeWrite } from "../../types/types";
import FreeWrites from "../../models/FreeWrites";
import { Box, Button, Card, Chip, Stack } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import EditFreeWritesListItem from "./EditFreeWritesListItem";
import { EventBus } from "../../event-bus/event-bus";
import ConfirmActionModal from "../utils/ConfirmActionModal";

function FreeWritesListItem({ freeWrite }: { freeWrite: FreeWrite }) {
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    EventBus.getInstance().register(`save-free-write-${freeWrite.id}`, () => {
      setEdit(false);
    });
  });
  return (
    <>
      {edit ? (
        <EditFreeWritesListItem freeWrite={freeWrite}></EditFreeWritesListItem>
      ) : (
        <Card sx={{ padding: "16px" }}>
          <Stack>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Stack direction="row">
                <p>{freeWrite?.text}</p>
              </Stack>
              <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
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
                    FreeWrites.delete(freeWrite!.id!);
                  }}
                />

                {edit ? (
                  <Button
                    onClick={() =>
                      EventBus.getInstance().dispatch<string[]>(
                        `save-free-write-${freeWrite.id}`
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
              {freeWrite?.tags?.map((each, i) => (
                <Chip label={each} key={i} />
              ))}
            </Stack>
          </Stack>
        </Card>
      )}
    </>
  );
}
export default FreeWritesListItem;
