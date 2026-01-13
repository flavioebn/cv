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
  const { name, avatar: file, groupStartDate } = body;

  const owner = JSON.parse(localStorage.getItem("botecoRatsUser"));

  const formData = new FormData();
  formData.append("name", name);
  formData.append("avatar", file);
  formData.append("groupStartDate", groupStartDate);
  formData.append("owner", JSON.stringify(owner));

  const response = await fetch(`${URL}/botecoRats/createGroup`, {
    method: "POST",
    body: formData,
  });

  return response.json();
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
  // const userId = getFromStorage("botecoRatsUser")._id;
  const userId = "69648d8135e50b3bb59c6a86";
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
  const { userId, name, type, amount } = body;

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
    }),
  });

  return response.json();
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

export {
  registerBotecoUser,
  loginBotecoUser,
  registerBotecoGroup,
  getMyGroups,
  getGroupDetails,
  addPersonalDrink,
  getMyDrinks,
  getUserInfo,
};
