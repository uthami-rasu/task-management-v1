import { useState, useEffect } from "react";
import { timeAgo } from "../Utils/utils";
import { FilterBtns } from "../Utils/constants";
import { Star, Edit, Trash2 } from "lucide-react";
import useTasks from "../context/usertasks";
import { useUserContext } from "../context/usercontext";
import { fadeOut } from "./StyledComponents/TaskFormStyles";
import { TaskForm } from "./Forms/TaskForm";
import {
  MainContentStyle,
  TaskContainerStyle,
  CartStyle,
} from "./StyledComponents/MainContentStyles";
import { ShimmerCard, ShimmerMainContent } from "./ShimmerUi";
import useFetchTasks from "../Hooks/useFetchTasks";
import { removeTask } from "./Api/deleteTask";
function MainContent() {
  let [processedTasks, setProcessedTasks] = useState([]);
  let [filters, setFilters] = useState({
    type: "all",
    index: 0,
    isActive: true,
  });

  let {
    isFormVisible,
    setIsFormVisible,
    tasks,
    updateTaskArray,
    taskToEdit,
    setTaskToEdit,
    isEditing,
    setIsEditing,
  } = useTasks();

  let { loading, setLoading, loginStatus, navigate } = useUserContext();
  const handleTaskBtn = () => {
    setIsFormVisible(true);
  };

  useEffect(() => {
    const result = tasks
      .filter((task) => filters.type === "all" || task.status === filters.type)
      .map((task) => ({
        ...task,
        timeAgo: timeAgo(task?.last_modified),
      }));
    setProcessedTasks(result);
  }, [tasks, filters.type]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    let response = await fetch(
      "https://expert-spork-g4qp7v7xvqgv3xj7-8000.app.github.dev/api/tasks/"
    );

    let data = await response.json();
    console.log(data);
    updateTaskArray(data.Test);
    setLoading(false);
  };
  const handleDeleteTask = async (id) => {
    updateTaskArray(tasks.filter((task, idx) => task.task_id !== id));

    await removeTask(id);
  };
  const handleTaskEdit = (task) => {
    setIsFormVisible(true);
    setIsEditing(true);
    setTaskToEdit(task);
  };

  const handleIsFavor = (taskid) => {
    updateTaskArray(
      tasks.map((t) =>
        t.task_id === taskid ? { ...t, is_favor: t.is_favor ? false : true } : t
      )
    );
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
        {processedTasks.map((task, idx) => {
          return (
            <CartStyle key={task.task_id}>
              <h1 className="cart-title">{task.title}</h1>
              <p className="cart-desc">{task.description}</p>
              <div className="cart-footer">
                <p>{task.timeAgo}</p>
                <p style={{ color: task.color }}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </p>
                <div className="grps">
                  <button onClick={() => handleIsFavor(task.task_id)}>
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
              Add Task
            </button>
          </CartStyle>
        )}
      </TaskContainerStyle>
      {isFormVisible && (
        <TaskForm
          isVisible={isFormVisible}
          isEditing={isEditing}
          taskToEdit={taskToEdit}
        >
          Task Form Content
        </TaskForm>
      )}
    </MainContentStyle>
  );
}

export default MainContent;
