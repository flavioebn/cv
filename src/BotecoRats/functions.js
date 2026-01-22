import { getFromStorage } from "../utils/utils";

const URL = "https://pugilistically-nonbillable-sol.ngrok-free.dev";

const registerBotecoUser = async (body) => {
  const { user, password, profilePic: file } = body;
  const formData = new FormData();
  formData.append("user", user);
  formData.append("password", password);
  formData.append("avatar", file);

  const response = await fetch(`${URL}/botecoRats/userRegister`, {
    method: "POST",
    body: formData,
  });
  const code = response.status;
  const res = await response.json();
  if (code !== 201) {
    alert(res.msg);
    return { error: `Register failed with status code ${code}` };
  }
  return { res, code };
};

const registerBotecoGroup = async (body) => {
  const {
    name,
    avatar: file,
    groupStartDate,
    drinksFilter,
    groupEndDate,
    weekendOnly,
    type,
    goalType,
    goalValue,
  } = body;

  const owner = JSON.parse(localStorage.getItem("botecoRatsUser"));

  const formData = new FormData();
  formData.append("name", name);
  formData.append("avatar", file);
  formData.append("groupStartDate", groupStartDate);
  formData.append("owner", JSON.stringify(owner));
  formData.append("drinksFilter", JSON.stringify(drinksFilter));
  formData.append("groupEndDate", groupEndDate);
  formData.append("weekendOnly", weekendOnly);
  formData.append("type", type);
  formData.append("goalType", goalType);
  formData.append("goalValue", goalValue);

  const response = await fetch(`${URL}/botecoRats/createGroup`, {
    method: "POST",
    body: formData,
  });

  const code = response.status;
  const res = await response.json();

  if (code !== 201) {
    alert(res.msg);
    return { error: `Deu erro ${code}` };
  }

  return { res, code };
};

const updateBotecoGroup = async (body) => {
  const response = await fetch(`${URL}/botecoRats/updateGroup/${body._id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const code = response.status;
  const res = await response.json();

  if (code !== 200) {
    alert(res.msg);
    return { error: `Deu erro ${code}` };
  }

  return { res, code };
};

const loginBotecoUser = async (body) => {
  const response = await fetch(`${URL}/botecoRats/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const code = response.status;
  const res = await response.json();
  if (code !== 200) {
    alert(res.msg);
    return { error: `Login failed with status code ${code}` };
  }
  return { res, code };
};

const getUserInfo = async () => {
  const user = localStorage.getItem("botecoRatsUser");
  if (!user) {
    return { error: "No user in local storage" };
  }
  const userId = JSON.parse(user)._id;
  const response = await fetch(`${URL}/botecoRats/userInfo/${userId}`, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  const code = response.status;
  const res = await response.json();
  if (code !== 200) {
    alert(res.msg);
    return { error: `Fetch failed with status code ${code}` };
  }
  return { res, code };
};

const getMyGroups = async () => {
  const userId = getFromStorage("botecoRatsUser")._id;
  const response = await fetch(`${URL}/botecoRats/mygroups/${userId}`, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  const code = response.status;
  const res = await response.json();
  if (code !== 200) {
    alert(res.msg);
    return { error: `Fetch failed with status code ${code}` };
  }
  return { res, code };
};

const getGroupDetails = async (groupId) => {
  const response = await fetch(`${URL}/botecoRats/group/${groupId}`, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  const code = response.status;
  const res = await response.json();
  if (code !== 200) {
    alert(res.msg);
    return { error: `Fetch failed with status code ${code}` };
  }
  return { res, code };
};

const addPersonalDrink = async (body) => {
  const { userId, name, type, amount, date } = body;

  const response = await fetch(`${URL}/botecoRats/addPersonalDrink`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      type,
      amount,
      userId,
      date,
    }),
  });

  const code = response.status;
  const res = await response.json();
  if (code !== 201) {
    alert(res.msg);
    return { error: `Fetch failed with status code ${code}` };
  }
  return { res, code };
};

const deletePersonalDrink = async (drinkId) => {
  const response = await fetch(
    `${URL}/botecoRats/deletePersonalDrink/${drinkId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const code = response.status;
  const res = await response.json();
  if (code !== 200) {
    alert(res.msg);
    return { error: `Fetch failed with status code ${code}` };
  }
  return { res, code };
};

const getMyDrinks = async () => {
  const userId = getFromStorage("botecoRatsUser")._id;
  const response = await fetch(`${URL}/botecoRats/mydrinks/${userId}`, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  const code = response.status;
  const res = await response.json();
  if (code !== 200) {
    alert(res.msg);
    return { error: `Fetch failed with status code ${code}` };
  }
  return { res, code };
};

const joinLeaveGroup = async (body) => {
  const { groupId, action } = body;
  const user = getFromStorage("botecoRatsUser");
  const response = await fetch(`${URL}/botecoRats/group/joinLeave/${groupId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action, user }),
  });
  const code = response.status;
  const res = await response.json();
  if (code !== 200) {
    alert(res.msg);
    return { error: `Fetch failed with status code ${code}` };
  }
  return { res, code };
};

export {
  registerBotecoUser,
  loginBotecoUser,
  registerBotecoGroup,
  getMyGroups,
  getGroupDetails,
  addPersonalDrink,
  getMyDrinks,
  getUserInfo,
  joinLeaveGroup,
  deletePersonalDrink,
  updateBotecoGroup,
};
