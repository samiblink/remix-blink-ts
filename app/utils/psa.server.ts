
export const getTaskData = async() => {
  const res = await fetch("https://account.taimer.com/react/api/v1/projects/resourcing", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Taimer-Authorization": process.env.PSA_SECRET_ACCESS_KEY,
    }
  });
  const tasks = await res.json();

  return tasks;
}

export const getHoursData = async({projectId}) => {
  const res = await fetch(`https://account.taimer.com/react/api/v1/hours?projectIds=${projectId}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Taimer-Authorization": process.env.PSA_SECRET_ACCESS_KEY,
    }
  });
  const projectHours = await res.json();

  return projectHours;
}
