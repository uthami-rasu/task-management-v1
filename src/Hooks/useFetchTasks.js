import { useEffect } from "react";
import useTasks from "../context/usertasks";
import { useState } from "react";

const useFetchTasks = () => {};

export default useFetchTasks;

export const fetchTasks = async () => {
  let response = await fetch(
    "https://expert-spork-g4qp7v7xvqgv3xj7-8000.app.github.dev/api/tasks/"
  );

  let data = await response.json();

  return data;
};
