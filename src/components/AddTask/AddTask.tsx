import React, { useEffect, useState } from "react";
import plusIcon from "../../assets/plus.svg";
import playIcon from "../../assets/play.svg";
import pauseIcon from "../../assets/pause.svg";
import stopIcon from "../../assets/stop.svg";
import { IconButton, TextField } from "@mui/material";
import Icon from "../../Icon";
import styled from "styled-components";
import { color } from "../../style";
import { addDataToCollection, queryCollectionData } from "../service/service";

const StyledIconButton = styled(IconButton)`
  /* Add your custom styles here */
  &:hover {
    background-color: lightblue;
  }
`;

export interface IInput {
  title: string;
  totalSpentTime: string;
  recordDate: Date;
}
export default function AddTask(): React.JSX.Element {
  const [showFormAddTask, setShowFormAddTask] = useState(false);

  return (
    <>
      {showFormAddTask ? (
        <AddTaskTitle />
      ) : (
        <StyledIconButton
          size="large"
          onClick={() => setShowFormAddTask((show) => !show)}
        >
          <Icon path={plusIcon} alt="Add" />
        </StyledIconButton>
      )}
    </>
  );
}

function AddTaskTitle(): React.JSX.Element {
  const [showFormAddTask, setShowFormAddTask] = useState(false);
  const [task, setTask] = useState<string>("");

  useEffect(() => {
    if (!showFormAddTask) setTask("");
  }, [showFormAddTask]);

  return showFormAddTask ? (
    <AddTaskFormContainer task={task} setShowFormAddTask={setShowFormAddTask} />
  ) : (
    <AddTaskTitleContainer>
      <TextField size="small" onChange={(e) => setTask(e.target.value)} />
      <StyledIconButton size="small" onClick={() => setShowFormAddTask(true)}>
        Add
      </StyledIconButton>
    </AddTaskTitleContainer>
  );
}

const AddTaskTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

type AddTaskFormContainerProps = {
  setShowFormAddTask: (show: boolean) => void;
  task: string;
};
function AddTaskFormContainer(
  props: AddTaskFormContainerProps
): React.JSX.Element {
  const { setShowFormAddTask, task } = props;
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleButtonClick = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const stop = async () => {
    setIsRunning(false);
    setShowFormAddTask(false);
    const data: IInput = {
      title: task,
      totalSpentTime: formatTime(time),
      recordDate: new Date(),
    };
    await addDataToCollection(data);
  };

  return (
    <AddTaskContainer>
      <TaskDetails>
        <TaskTitle>{task}</TaskTitle>
        <TaskTime>{formatTime(time)}</TaskTime>
      </TaskDetails>

      <TaskControls>
        <StyledIconButton size="large" onClick={() => handleButtonClick()}>
          <Icon path={isRunning ? pauseIcon : playIcon} alt="Add" />
        </StyledIconButton>
        <StyledIconButton size="large" onClick={() => stop()}>
          <Icon path={stopIcon} alt="Add" />
        </StyledIconButton>
      </TaskControls>
    </AddTaskContainer>
  );
}

const AddTaskContainer = styled.div`
  display: flex;
  width: 240px;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid ${color.darkBlue};
  border-radius: 8px;
  padding: 16px;
`;

const TaskDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskTitle = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 600;
`;

const TaskTime = styled.div`
  font-size: 16px;
`;

const TaskControls = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: space-between;
`;
