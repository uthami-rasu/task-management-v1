import { BACKEND_ENDPOINT } from "../../Utils/constants";

export const insertTask = async (task) => {
  console.log("Try to  Inserting");
  try {
    let response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
      credentials: "include",
    });
    if (response.ok) {
      console.log("Task Inserted");
    }
  } catch (err) {
    console.error("DEV", err);
  }
};
