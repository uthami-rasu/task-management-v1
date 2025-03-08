import { styled } from "styled-components";
import { useState, useEffect, useMemo } from "react";
import { FilterBtns, TaskForm } from "./utils";
import { Star, Edit, Trash2 } from "lucide-react";
import { useTasks, fadeOut, timeAgo } from "./utils";
import moment from "moment";
import { useUserContext } from "../context/usercontext";

import { useNavigate } from "react-router-dom";

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
    updateTaskArray,
    taskToEdit,
    setTaskToEdit,
    isEditing,
    setIsEditing,
    MainContentStyle,
    TaskContainerStyle,
    CartStyle,
    setActiveTasks,
  } = useTasks();

  let {
    loading,
    setLoading,
    loginStatus,
    setLoginStatus,
    userName,
    setUserName,
    navigate,
  } = useUserContext();
  const handleTaskBtn = () => {
    setIsFormVisible(true);
  };
  const BASE_URL = "https://backend-fastapi-3qe5.onrender.com";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(BASE_URL + "/auth/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setUserName(data?.user || "Buddy");
        if (res.ok) {
          setLoginStatus(true);
          navigate("/");
          return;
        }
        setLoginStatus(false);
        navigate("/auth/login");
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
  }, []);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isFormVisible) {
      setIsMounted(true);
      // console.log(fadeOut.toString());
    }
  }, [isFormVisible]);

  // Handle animation end for unmounting
  const handleAnimationEnd = (event) => {
    // console.log(event.animationName);
    if (!isFormVisible && event.animationName === fadeOut.getName()) {
      setIsMounted(false); // Only unmount after fadeOut animation finishes
    }
  };

  const handleDeleteTask = (id) => {
    // console.log("click");
    // alert("click");
    updateTaskArray(tasks.filter((task, idx) => task.taskid !== id));
  };
  const handleTaskEdit = (task) => {
    setIsFormVisible(true);
    setIsEditing(true);
    setTaskToEdit(task);
  };

  const handleIsFavor = (taskid) => {
    updateTaskArray(
      tasks.map((t) =>
        t.taskid === taskid ? { ...t, isfavor: t.isfavor ? false : true } : t
      )
    );
    // console.log(tasks);
  };
  const processedTasks = useMemo(() => {
    setLoading(true);
    const result = tasks
      .filter((task) => filters.type === "all" || task.status === filters.type)
      .map((task) => ({
        ...task,
        timeAgo: timeAgo(task.modified), // Compute only once per render cycle
      }));
    setLoading(false);
    return result;
  }, [tasks, filters.type]);

  if (!loginStatus) {
    navigate("/auth/login");
    console.log("m1");
    return;
  }
  console.log("m2");
  return (
    <>
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
          {!loading && loginStatus ? (
            processedTasks.map((task, idx) => {
              return (
                <CartStyle key={task.taskid}>
                  <h1 className="cart-title">{task.title}</h1>
                  <p className="cart-desc">{task.desc}</p>
                  <div className="cart-footer">
                    <p>{task.timeAgo}</p>
                    <p style={{ color: task.color }}>
                      {task.status.charAt(0).toUpperCase() +
                        task.status.slice(1)}
                    </p>
                    <div className="grps">
                      <button onClick={() => handleIsFavor(task.taskid)}>
                        <Star
                          size={20}
                          fill={task.isfavor ? "yellow" : "grey"}
                          stroke="grey"
                        />
                      </button>
                      <button onClick={() => handleTaskEdit(task)}>
                        <Edit size={20} stroke={"blue"} />
                      </button>
                      <button onClick={() => handleDeleteTask(task.taskid)}>
                        <Trash2 fill="red" stroke={"#000"} size={20} />
                      </button>
                    </div>
                  </div>
                </CartStyle>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
          {!loading && loginStatus && (
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
        {isMounted && (
          <TaskForm
            isVisible={isFormVisible}
            onAnimationEnd={handleAnimationEnd}
            isEditing={isEditing}
            taskToEdit={taskToEdit}
          >
            Task Form Content
          </TaskForm>
        )}
      </MainContentStyle>
    </>
  );
}

export default MainContent;
