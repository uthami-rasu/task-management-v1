import { BACKEND_ENDPOINT } from "../../Utils/constants";

const FavouriteTask = async (taskid, isfavor) => {
  console.log("try to update(fav)");
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/api/tasks", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task_id: taskid, is_favor: !isfavor }),
    });

    if (response.ok) {

      const res = await response.json();

      console.log("Task Updated!",res);
    }
  } catch (err) {
    console.log(err);
  }
};

export default FavouriteTask;
