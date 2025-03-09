import useTasks from "../../context/usertasks";
import { useEffect, useRef, useState } from "react";
import { TaskFormStyle } from "../StyledComponents/TaskFormStyles";
import { ButtonStyle } from "../StyledComponents/UtilsStyles";
export const TaskForm = ({ isVisible, onAnimationEnd, taskToEdit }) => {
  let {
    updateTaskArray,
    isEditing,
    setIsEditing,
    tasks,
    addTask,
    setIsFormVisible,
    setTaskToEdit,
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
            isWant={true}
          >
            {isEditing ? "Update" : "Create"}
          </ButtonStyle>
        </div>
      </form>
    </TaskFormStyle>
  );
};
