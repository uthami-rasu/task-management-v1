import { BACKEND_ENDPOINT } from "../../Utils/constants";
import useTasks from "../../context/usertasks";
export const updateTask = async (task) => {
  console.log("Try to update");
  try {
    const response = await fetch("/api/tasks/modify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
      credentials: "include",
    });

    if (response.ok) {
      const res = await response.json();

      console.log("Task Updated!", res);
    }
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};
