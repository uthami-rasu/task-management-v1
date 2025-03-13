import { BACKEND_ENDPOINT } from "../../Utils/constants";

export const insertTask = async (task) => {
  console.log("Try to  Inserting");
  try {
    let response = await fetch(BACKEND_ENDPOINT + "/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (response.ok) {
      console.log("Task Inserted");
    }
  } catch (err) {
    console.error("DEV", err);
  }
};
