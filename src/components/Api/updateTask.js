import { BACKEND_ENDPOINT } from "../../Utils/constants";

export const updateTask = async (task) => {
  console.log("Try to update");
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/api/tasks/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (response?.ok) {
      console.log("Task Updated!");
      return;
    }
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};
