import React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import { FilterBtns } from "../Utils/constants";
import { fadeOut } from "../components/StyledComponents/TaskFormStyles";
import { TaskForm } from "../components/Forms/TaskForm";
import { timeAgo } from "../Utils/utils";
import useTasks from "../context/usertasks";
import {
  MainContentStyle,
  TaskContainerStyle,
  CartStyle,
} from "../components/StyledComponents/MainContentStyles";
import { Star, Edit, Trash2 } from "lucide-react";
import { useUserContext } from "../context/usercontext";
import {ShimmerMainContent} from "../components/ShimmerUi";
import { BACKEND_ENDPOINT } from "../Utils/constants";
import FavouriteTask from "../components/Api/favorTask";
import { removeTask } from "../components/Api/deleteTask";
import { updateTask } from "../components/Api/updateTask";
import { addTask } from "../components/Api/insertTask";
function DynamicMainContent({ cType }) {
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
    processedTasks,
    setProcessedTasks,
  } = useTasks();

  const { loginStatus, loading, setLoading } = useUserContext();
  const handleTaskBtn = () => {
    setIsFormVisible(!isFormVisible);
  };
  useEffect(() => {
    fetchTasks();
    console.log(loading);
  }, [cType]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      let response = await fetch("/api/tasks/",{
        method:"GET",
        credentials:"include",
        mode:"cors"
      });

      if (!response.ok) {
        
        throw new Error("Something went Wrong");
        
      }

      let data = await response.json();

      updateTaskArray(data?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
     
    }
  };
  useEffect(() => {
    setLoading(true);
    const results = tasks
      .filter((task) => {
        switch (cType) {
          case "Pending":
            return task.is_completed === "no";

          case "Completed":
            return task.is_completed === "yes";

          case "Favorite":
            return task?.is_favor === true;

          case "Overdue":
            return (
              Date.now() > new Date(task.duedate).getTime() &&
              task.is_completed === "no"
            );

          default:
            return true;
        }
      })
      .filter((task) => filters.type === "all" || task.status === filters.type)
      .map((task) => ({
        ...task,
        timeAgo: timeAgo(task?.last_modified), // Compute only once per render cycle
      }));

    setProcessedTasks(results);

    setLoading(false);
  }, [tasks, filters.type, cType]);

  const handleDeleteTask = async (id) => {
    updateTaskArray(tasks.filter((task, idx) => task.task_id !== id));

    await removeTask(id);
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
    navigate("auth/login");
    return;
  }

  return loading  ? (
    <ShimmerMainContent />
  ) : (
    <MainContentStyle>
      <div className="inner-header">
        <h2>{cType} Tasks</h2>
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
        {processedTasks.length > 0 &&
          processedTasks.map((task, idx) => {
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
        <CartStyle border={"true"}>
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
      </TaskContainerStyle>
      {isFormVisible && (
        <TaskForm is_visible={isFormVisible} task_to_edit={taskToEdit}>
          Task Form Content
        </TaskForm>
      )}
    </MainContentStyle>
  );
}

export default DynamicMainContent;
