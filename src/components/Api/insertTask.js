export const insertTask = async (task) => {
  console.log("Try to  Inserting");
  try {
    let response = await fetch(
      "https://expert-spork-g4qp7v7xvqgv3xj7-8000.app.github.dev/api/tasks/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );
    if (response.ok) {
      console.log("Task Inserted");
    }
  } catch (err) {
    console.error("DEV", err);
  }
};
