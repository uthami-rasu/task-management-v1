import styled, { keyframes, css } from "styled-components";
import moment from "moment";

import {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
  useRef,
  useMemo,
} from "react";
export const ButtonStyle = styled.button`
  height: ${({ h }) => (h ? h : "2rem")};
  width: ${({ w }) => (w ? w : "8rem")};
  background: ${({ bg }) => (bg ? bg : "#000")};
  padding: 0.2rem;
  outline: none;
  border-radius: ${({ brc }) => (brc ? brc : "0.4rem")};
  color: ${({ fc }) => (fc ? fc : "#fff")};
  border: ${({ brc }) => (brc ? brc : "none")};
  font-weight: 450;
`;

export function Button({ name }) {
  return <ButtonStyle>{name ?? "No Name"}</ButtonStyle>;
}

export const SocialLogos = [
  {
    link: "",
    imgsource: "1",
  },
  {
    link: "",
    imgsource: "2",
  },
  {
    link: "",
    imgsource: "3",
  },
];

export const MainContentStyle = styled.div`
  grid-area: main;
  background: #ecebde;
  padding: 0.5rem;
  border-radius: 0.3rem;
  // border: 1px solid #000;
  box-shadow: 0 0 1px #000;

  display: grid;
  grid-template-rows: 2.5rem 80vh;
  row-gap: 0.2rem;
`;

export const TaskContainerStyle = styled.div`
  padding: 0.5rem;
  display: grid;

  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 1rem;
  overflow-y: scroll !important;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 5px;
    background: #4a90e2;
  }
  &::-webkit-scrollbar-thumb {
    width: 8px;
    border-radius: 3px;
    background: linear-gradient(45deg, #ff7eb3, #ff758c);
  }
  &::-webkit-scrollbar-track {
    background: #e3f2fd;
  }
`;

export const CartStyle = styled.div`
  padding: 0.5rem;
  box-shadow: 0 0 1px #bbb;
  background: #fff;
  display: grid;
  grid-template-rows: 2rem 4rem 1fr;
  border-radius: 0.4rem;
  oveflow: hidden;
  height: 12rem;
  border: ${({ border }) => (border ? "3px dotted grey" : "none")};
`;
export const FilterBtns = ["All", "Low", "Medium", "Hard"];

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [favTasks, setFavTasks] = useState([]);
  const handleTaskEdit = (task) => {
    setTaskToEdit(task);
  };
  const ValidateTask = (task) => {
    return task;
  };
  const updateTaskArray = (taskUpdated) => {
    setTasks([...taskUpdated]);
  };
  const FormatTask = (task) => {
    return task;
  };
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const { activeTasks, completedTasks } = useMemo(() => {
    return tasks.reduce(
      (acc, t) => {
        if (t.completed === "no") acc.activeTasks += 1;
        if (t.completed === "yes") acc.completedTasks += 1;
        return acc;
      },
      { activeTasks: 0, completedTasks: 0 }
    );
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        FormatTask,
        isFormVisible,
        setIsFormVisible,
        updateTaskArray,
        taskToEdit,
        setTaskToEdit,
        isEditing,
        setIsEditing,
        favTasks,
        setFavTasks,
        MainContentStyle,
        TaskContainerStyle,
        CartStyle,
        activeTasks,
        completedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);

// create Task PopUp
// Define Keyframe Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
`;
// const TaskFormStyle = styled.div`
//   position: absolute;
//   background: #fff;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   height: 430px;
//   width: 320px;
//   border-radius: 0.4rem;
//   padding: 0.5rem;
//   transition: opacity 0.3s ease, transform 0.3s ease;

//   ${({ isVisible }) =>
//     isVisible
//       ? `animation: ${fadeIn} 0.3s forwards; visibility: visible;`
//       : `animation: ${fadeOut} 0.3s forwards;`}
// `;
// Styled Component
const TaskFormStyle = styled.div`
  z-index: 3;
  position: absolute;
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 430px;
  width: 320px;
  border-radius: 0.4rem;
  padding: 0.5rem;
  transition: opacity 0.3s ease, transform 0.3s ease;
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  ${({ isVisible }) =>
    isVisible
      ? css`
          animation: ${fadeIn} 0.3s forwards;
        `
      : css`
          animation: ${fadeOut} 0.3s forwards;
        `}
`;

export const TaskForm = ({ isVisible, onAnimationEnd, taskToEdit }) => {
  let {
    updateTaskArray,
    isEditing,
    setIsEditing,
    tasks,
    addTask,
    setIsFormVisible,
    setTaskToEdit,
    setActiveTasks,
  } = useTasks();
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const statusRef = useRef(null);
  const dueDateRef = useRef(null);
  const isCompletedRef = useRef(null);

  const clearRefValues = () => {
    if (titleRef.current) titleRef.current.value = "";
    if (descRef.current) descRef.current.value = "";
    if (statusRef.current) statusRef.current.value = "low";
    if (dueDateRef.current) dueDateRef.current.value = "";
    if (isCompletedRef.current) isCompletedRef.current.value = "no";
  };
  useEffect(() => {
    if (taskToEdit) {
      titleRef.current.value = taskToEdit.title;
      descRef.current.value = taskToEdit.desc;
      statusRef.current.value = taskToEdit.status;
      dueDateRef.current.value = taskToEdit.duedate;
      isCompletedRef.current.value = taskToEdit.completed;
    } else {
      clearRefValues();
    }
  }, [taskToEdit]);
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const taskInstance = {
      taskid: taskToEdit ? taskToEdit.taskid : tasks.length + 1,
      title: titleRef.current?.value || "No Title",
      desc: descRef.current?.value || "No Description",
      status: statusRef.current?.value || "low",
      duedate: dueDateRef.current?.value,
      completed: isCompletedRef.current?.value,
      isfavor: taskToEdit ? taskToEdit.isfavor : false,
      modified: taskToEdit ? taskToEdit.modified : new Date().toISOString(),
    };
    taskInstance.color =
      taskInstance.status === "low"
        ? "blue"
        : taskInstance.status === "medium"
        ? "orange"
        : "red";
    // update tasks array
    if (taskToEdit) {
      updateTaskArray(
        tasks.map((task) =>
          task.taskid === taskToEdit.taskid ? taskInstance : task
        )
      );
      setTaskToEdit(null);
      setIsEditing(false);
    } else {
      addTask(taskInstance);
    }
    setIsFormVisible(false);
    clearRefValues();
  };
  return (
    <TaskFormStyle isVisible={isVisible} onAnimationEnd={onAnimationEnd}>
      <form method="post" onSubmit={handleFormSubmit}>
        <div className="frm-grp">
          <label>Title</label>
          <input ref={titleRef} type="text" placeholder={"Ex: Read the book"} />
        </div>
        <div className="frm-grp">
          <label>Description</label>
          <textarea
            ref={descRef}
            rows={3}
            cols={4}
            placeholder={"Ex: Read 10 pages from the book"}
          ></textarea>
        </div>
        <div className="frm-grp">
          <label>Select Priority</label>
          <select ref={statusRef}>
            <option value={"low"}>Low</option>
            <option value={"medium"}>Medium</option>
            <option value={"hard"}>Hard</option>
          </select>
        </div>
        <div className="frm-grp">
          <label>Due Date</label>
          <input ref={dueDateRef} type="date" placeholder="select date" />
        </div>
        <div className="frm-grp">
          <label>Task Completed</label>
          <div className="frm-grp-status">
            <span style={{ marginLeft: "4px", fontSize: "0.8rem" }}>
              Completed
            </span>
            <select ref={isCompletedRef}>
              <option value={"no"}>No</option>
              <option value={"yes"}>Yes</option>
            </select>
          </div>
        </div>
        <div className="frm-grp">
          <ButtonStyle
            type={"submit"}
            style={{ textAlign: "center", marginTop: "0.3rem" }}
            bg={isEditing ? "#3674B5" : "#16C47F"}
            w={"100%"}
          >
            {isEditing ? "Update Task" : "Create Task"}
          </ButtonStyle>
        </div>
      </form>
    </TaskFormStyle>
  );
};

export const timeAgo = (timestamp) => {
  const now = moment();
  const createdTime = moment(timestamp);
  const diffInSeconds = now.diff(createdTime, "seconds");
  const diffInMinutes = now.diff(createdTime, "minutes");
  const diffInHours = now.diff(createdTime, "hours");
  const diffInDays = now.diff(createdTime, "days");

  if (diffInSeconds < 60) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  if (diffInHours < 24) return `${diffInHours} hr ago`;
  if (diffInDays < 7) return `${diffInDays} days ago`;
  return createdTime.format("YYYY-MM-DD");
};




// Spinner Animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled Spinner Component
const Spinner = styled.div`
  width: 35px;
  height: 35px;
  border: 6px solid #ddd;
  border-top: 6px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// Styled Loading Container
export const ProfileLoading = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 500;
  flex-direction: column;
  color: #000;
`;



export  function LoadingProfile() {
  return (
    <ProfileLoading>
      <Spinner />
      <p>Loading..</p>
    </ProfileLoading>
  );
}
