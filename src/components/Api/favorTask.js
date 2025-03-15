import { BACKEND_ENDPOINT } from "../../Utils/constants";

// curl -X 'PATCH' \
//   'https://backend-fastapi-3qe5.onrender.com/api/tasks/' \
//   -H 'accept: application/json' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "task_id": "b53c27",
//   "is_favor": false

const FavouriteTask = async (taskid, isfavor) => {
  console.log("try to update(fav)");
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/api/tasks/modify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ task_id: taskid, is_favor: !isfavor }),
      mode: "cors",
      credentials: "include",
    });

    if (response.ok) {
      const res = await response.json();

      console.log("Task Updated!(fav)", res);
    }
  } catch (err) {
    console.log(err);
  }
};

export default FavouriteTask;
