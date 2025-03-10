const BASE_URL = "https://expert-spork-g4qp7v7xvqgv3xj7.github.dev"; //"https://backend-fastapi-3qe5.onrender.com";

export const removeTask = async (id) => {
  try {
    const response = await fetch(
      "https://expert-spork-g4qp7v7xvqgv3xj7-8000.app.github.dev/api/tasks/",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task_id: id }),
      }
    );

    if (response.ok) {
      console.log("Task Removed!");
    }
  } catch (err) {
    console.error("DEV", err);
  }
};
