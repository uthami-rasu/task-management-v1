import { useState, useEffect } from "react";

import useTasks from "../context/usertasks";

const useTaskDetails = () => {
  const { tasks } = useTasks();

  const [taskDetails, setTaskDetails] = useState({
    activeTasks: 0,
    completedTasks: 0,
  });

  useEffect(() => {
    let result = tasks.reduce(
      (acc, task) => {
        // console.log(task, "from hook");
        if (task.is_completed === "no" || task.is_completed === false)
          acc.activeTasks += 1;
        if (task.is_completed === "yes" || task.is_completed === true)
          acc.completedTasks += 1;
        return acc;
      },
      { activeTasks: 0, completedTasks: 0 }
    );
    setTaskDetails(result);
  }, [tasks]);

  console.log("useTaskDetails", taskDetails);
  console.log(tasks, "tasks");
  return [taskDetails.activeTasks, taskDetails.completedTasks];
};

export default useTaskDetails;
