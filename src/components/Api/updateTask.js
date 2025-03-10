export const updateTask = async (task) => {
  console.log("Try to update");
  try {
    const response = await fetch(
      "https://expert-spork-g4qp7v7xvqgv3xj7-8000.app.github.dev/api/tasks/",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );

    if (response?.ok) {
      console.log("Task Updated!");
      return;
    }
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};
