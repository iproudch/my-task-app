import React, { useRef, useState } from "react";
import plusIcon from "../../assets/plus.svg";
import { Box, Button, IconButton, TextField } from "@mui/material";
import AddTaskFormProvider from "./AddTaskFormProvider";
import Icon from "../../Icon";
import styled from "styled-components";
import { color } from "../../style";

const customButtonStyles = {
  border: "1px solid #3a4660",
  color: "#c9af98",
};

const StyledIconButton2 = {
  color: "#ed8a63",
  border: "none",
};

const StyledIconButton = styled(IconButton)`
  /* Add your custom styles here */
  &:hover {
    background-color: lightblue;
  }
`;

export default function AddTask(): React.JSX.Element {
  const [showFormAddTask, setShowFormAddTask] = useState(false);

  return (
    <>
      <StyledIconButton
        size="large"
        onClick={() => setShowFormAddTask((show) => !show)}
      >
        <Icon path={plusIcon} alt="Add" />
      </StyledIconButton>
      {showFormAddTask && <AddTaskFormContainer />}
    </>
  );
}

function AddTaskFormContainer(): React.JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <AddTaskFormProvider formRef={formRef}>
      <AddTaskForm />
    </AddTaskFormProvider>
  );
}

function AddTaskForm(): React.JSX.Element {
  return (
    <StyledAddTaskFormContainer>
      <Box display="flex" flexDirection="column" alignItems="center">
        <h5>Title</h5>
        <CustomTextField
          variant="outlined"
          // value={task}
          // onChange={handleTaskChange}
          margin="normal"
          required
        />
        <h5>Start</h5>
        <CustomTextField
          variant="outlined"
          // value={startDate}
          // onChange={handleStartDateChange}
          margin="normal"
          type="date"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </Box>
    </StyledAddTaskFormContainer>
  );
}

const CustomTextField = styled(TextField)`
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: white;
    border-width: 1px;
  }
`;

const StyledAddTaskFormContainer = styled.div`
  display: flex;
  border: 1px solid ${color.darkBlue};
  border-radius: 8px;
  padding: 32px;
`;
