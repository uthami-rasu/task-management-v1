import { useState, useContext, useMemo } from "react";
import { createContext } from "react";
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [processedTasks, setProcessedTasks] = useState([]);

  const updateTaskArray = (taskUpdated) => {
    console.log(taskUpdated, "updateTaskArray");
    setTasks([...taskUpdated]);
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        isFormVisible,
        setIsFormVisible,
        updateTaskArray,
        taskToEdit,
        setTaskToEdit,
        isEditing,
        setIsEditing,

        processedTasks,
        setProcessedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useTasks = () => useContext(TaskContext);

export default useTasks;
