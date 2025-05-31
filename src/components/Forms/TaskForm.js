import useTasks from "../../context/usertasks";
import { useEffect, useRef, useState } from "react";
import { TaskFormStyle } from "../StyledComponents/TaskFormStyles";
import { ButtonStyle } from "../StyledComponents/UtilsStyles";
import { generateId } from "../../Utils/utils";
import { insertTask } from "../Api/insertTask";
import { updateTask } from "../Api/updateTask";
export const TaskForm = ({
  is_visible: isVisible,
  task_to_edit: taskToEdit,
}) => {
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
      descRef.current.value = taskToEdit.description;
      statusRef.current.value = taskToEdit.status;
      dueDateRef.current.value = taskToEdit.duedate;
      isCompletedRef.current.value = taskToEdit.is_completed;
    } else {
      clearRefValues();
    }
  }, [taskToEdit]);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const taskInstance = {
      task_id: taskToEdit ? taskToEdit.task_id : generateId(),
      title: titleRef.current?.value || "No Title",
      description: descRef.current?.value || "No Description",
      status: statusRef.current?.value || "low",
      duedate: dueDateRef.current?.value || new Date().toISOString(),
      is_completed: isCompletedRef.current?.value,
      is_favor: taskToEdit ? taskToEdit.is_favor : false,
      last_modified: taskToEdit
        ? taskToEdit.last_modified
        : new Date().toISOString(),
    };

    taskInstance.color =
      taskInstance.status === "low"
        ? "blue"
        : taskInstance.status === "medium"
        ? "orange"
        : "red";
    // update tasks array
    console.log(taskInstance, "TI");
    if (taskToEdit) {
      updateTaskArray(
        tasks.map((task) =>
          task.task_id === taskToEdit.task_id ? taskInstance : task
        )
      );
    } else {
      addTask(taskInstance);
    }

    setIsEditing(false);
    setIsFormVisible(false);
    if (taskToEdit) {
      setTaskToEdit(null);

      updateTaskArray(
        tasks.map((t) =>
          t.task_id === taskInstance.task_id ? { ...t, ...taskInstance } : t
        )
      );
      await updateTask(taskInstance);
    } else {
      await insertTask(taskInstance);
    }
    clearRefValues();
  };
  return (
    <TaskFormStyle isVisible={isVisible}>
      <form method="post" onSubmit={handleFormSubmit} className="flex-col">
        <div className="frm-grp">
          <label>Title</label>
          <input
            ref={titleRef}
            type="text"
            className="tf-style"
            placeholder={"Ex: Read the book"}
          />
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
        <div className="flex-center">
          <div className="frm-grp">
            <label>Select Priority</label>
            <select ref={statusRef} className="tf-style">
              <option value={"low"}>Low</option>
              <option value={"medium"}>Medium</option>
              <option value={"hard"}>Hard</option>
            </select>
          </div>
          <div className="frm-grp">
            <label>Due Date</label>
            <input
              ref={dueDateRef}
              type="date"
              placeholder="select date"
              className="tf-style"
            />
          </div>
        </div>
        <div className="frm-grp">
          <label>Task Completed</label>
          <div className="frm-grp-status">
            <span style={{ marginLeft: "4px", fontSize: "0.8rem" }}>
              Completed
            </span>
            <select ref={isCompletedRef} className="tf-style">
              <option value={"no"} defaultChecked>
                No
              </option>
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
