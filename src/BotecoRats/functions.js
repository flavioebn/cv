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
  return response.json();
};

const registerBotecoGroup = async (body) => {
  const { name, avatar: file } = body;

  const owner = JSON.parse(localStorage.getItem("botecoRatsUser"));

  const formData = new FormData();
  formData.append("name", name);
  formData.append("avatar", file);
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
  if (code !== 200) {
    return { error: `Login failed with status code ${code}` };
  }
  return { res: await response.json(), code };
};

const getMyGroups = async (userId) => {
  console.log("fgasdf");
  const response = await fetch(`${URL}/botecoRats/mygroups/${userId}`, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  const code = response.status;
  if (code !== 200) {
    return { error: `Fetch failed with status code ${code}` };
  }
  return { res: await response.json(), code };
};

const getGroupDetails = async (groupId) => {
  const response = await fetch(`${URL}/botecoRats/group/${groupId}`, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  const code = response.status;
  if (code !== 200) {
    return { error: `Fetch failed with status code ${code}` };
  }
  return { res: await response.json(), code };
};

const addPersonalDrink = async (body) => {
  const { userId, name, type, amount } = body;
  console.log(body);

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

export {
  registerBotecoUser,
  loginBotecoUser,
  registerBotecoGroup,
  getMyGroups,
  getGroupDetails,
  addPersonalDrink,
};
