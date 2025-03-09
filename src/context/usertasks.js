import { useState, useContext, useMemo } from "react";
import { createContext } from "react";
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [processedTasks, setProcessedTasks] = useState([]);
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
        isFormVisible,
        setIsFormVisible,
        updateTaskArray,
        taskToEdit,
        setTaskToEdit,
        isEditing,
        setIsEditing,
        favTasks,
        setFavTasks,
        activeTasks,
        completedTasks,
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
