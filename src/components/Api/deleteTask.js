import { BACKEND_ENDPOINT } from "../../Utils/constants";

export const removeTask = async (id) => {
  try {
    console.log("Try to delete");
    const response = await fetch(BACKEND_ENDPOINT + "/api/tasks/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task_id: id }),
      credentials: "include",
    });

    if (response.ok) {
      console.log("Task Removed!");
    }
  } catch (err) {
    console.error("DEV", err);
  }
};
