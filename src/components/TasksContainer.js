import { useState, useEffect } from "react";
import { timeAgo } from "../Utils/utils";
import { FilterBtns } from "../Utils/constants";
import { Star, Edit, Trash2 } from "lucide-react";
import useTasks from "../context/usertasks";
import { useUserContext } from "../context/usercontext";
import { TaskForm } from "./Forms/TaskForm";

import {
  MainContentStyle,
  TaskContainerStyle,
  CartStyle,
} from "./StyledComponents/MainContentStyles";
import { ShimmerMainContent } from "./ShimmerUi";
import { removeTask } from "./Api/deleteTask";

import { BACKEND_ENDPOINT } from "../Utils/constants";
import FavouriteTask from "./Api/favorTask";
import moment from "moment";
function MainContent() {
  let [filters, setFilters] = useState({
    type: "all",
    index: 0,
    isActive: true,
  });

  let {
    isFormVisible,
    setIsFormVisible,
    tasks,
    setTasks,
    updateTaskArray,
    taskToEdit,
    setTaskToEdit,
    isEditing,
    setIsEditing,
    processedTasks,
    setProcessedTasks,
  } = useTasks();

  let { loading, setLoading, loginStatus, navigate } = useUserContext();
  const handleTaskBtn = () => {
    setIsFormVisible(true);
  };

  useEffect(() => {
    if (tasks.length === 0) {
      setProcessedTasks([]);
    }
    const result = tasks
      .filter((task) => filters.type === "all" || task.status === filters.type)
      .map((task) => ({
        ...task,
        timeAgo: timeAgo(task?.last_modified),
        createDateFormat: moment(task.created_at).format(
          "DD-MM-YYYY HH:mm:sss"
        ),
      }));
    setProcessedTasks(result);
  }, [tasks, filters.type]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      let response = await fetch("/api/tasks", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Something went Wrong");
      }

      let result = await response.json();

      updateTaskArray(result?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.task_id !== id));
    removeTask(id);
  };

  const handleTaskEdit = (task) => {
    setIsFormVisible(true);
    setIsEditing(true);
    setTaskToEdit(task);
  };

  const handleIsFavor = async (taskid, isfavor) => {
    updateTaskArray(
      tasks.map((t) =>
        t.task_id === taskid ? { ...t, is_favor: !isfavor } : t
      )
    );

    await FavouriteTask(taskid, isfavor);
  };

  if (!loginStatus) {
    navigate("/auth/login");
    return;
  }

  return loading ? (
    <ShimmerMainContent />
  ) : (
    <MainContentStyle>
      <div className="inner-header">
        <h2>
          {filters.type.charAt(0).toUpperCase() + filters.type.slice(1)} Tasks
        </h2>
        <div className="filters">
          {FilterBtns.map((elem, idx) => {
            return (
              <button
                style={
                  filters.isActive && filters.type === elem.toLowerCase()
                    ? { color: "green", background: "#ddd", fontWeight: 500 }
                    : { color: "#000", background: "#fff" }
                }
                key={idx}
                onClick={() =>
                  setFilters({
                    type: elem.toLowerCase(),
                    index: idx,
                    isActive: true,
                  })
                }
              >
                {elem}
              </button>
            );
          })}
        </div>
      </div>

      <TaskContainerStyle id={"task-container"}>
        {tasks.length > 0 &&
          processedTasks.map((task, idx) => {
            return (
              <CartStyle key={task.task_id}>
                <h1 className="cart-title">{task.title}</h1>
                <p className="cart-desc">{task.description}</p>
                <p className="cart-created">
                  some date shoudl display
                  {/* {task?.createDateFormat} */}
                </p>
                <div className="cart-footer">
                  <p>{task.timeAgo}razz</p>
                  <p style={{ color: task.color }}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </p>

                  <div className="grps">
                    <button
                      onClick={() => handleIsFavor(task.task_id, task.is_favor)}
                    >
                      <Star
                        size={20}
                        fill={task.is_favor ? "yellow" : "grey"}
                        stroke="grey"
                      />
                    </button>
                    <button onClick={() => handleTaskEdit(task)}>
                      <Edit size={20} stroke={"blue"} />
                    </button>
                    <button onClick={() => handleDeleteTask(task.task_id)}>
                      <Trash2 fill="red" stroke={"#000"} size={20} />
                    </button>
                  </div>
                </div>
              </CartStyle>
            );
          })}
        {loginStatus && (
          <CartStyle border={"true"} className="last-card">
            <button
              style={{
                textAlign: "center",
                borderRadius: "0.4rem",
                border: "none",
                height: "11rem",
                cursor: "pointer",
                fontSize: "1.2rem",
                fontWeight: "450",
                color: "grey",
              }}
              onClick={handleTaskBtn}
            >
              <p> Add Task</p>
              {processedTasks.length === 0 && (
                <span style={{ fontSize: "15px" }}>(Nothing to Display)</span>
              )}
            </button>
          </CartStyle>
        )}
      </TaskContainerStyle>
      {isFormVisible && (
        <TaskForm is_visible={isFormVisible} task_to_edit={taskToEdit}>
          Task Form Content
        </TaskForm>
      )}
    </MainContentStyle>
  );
}

export default MainContent;
