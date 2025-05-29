export const postPastebin = async (body) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Cookie",
    "pastebin_posted=ba366af657ce7a7a2fb1d1f4315bd4dfe239564e268c0e4ed2755f4bf621f3b8a%3A2%3A%7Bi%3A0%3Bs%3A15%3A%22pastebin_posted%22%3Bi%3A1%3Bs%3A8%3A%22jJb5Mu8L%22%3B%7D"
  );

  var urlencoded = new URLSearchParams();
  urlencoded.append("api_dev_key", "TowikWzG444uPbEnEqd06xMJtkVGoxZJ");
  urlencoded.append("api_paste_code", JSON.stringify(body));
  urlencoded.append("api_option", "paste");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const response = await fetch(
    "https://pastebin.com/api/api_post.php",
    requestOptions
  )
    .then((res) => res.text())
    // .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  return response;
};

export const getPastebin = async (url) => {
  const res = await fetch(
    `https://proxyanywhere-flavioebn.b4a.run/https://pastebin.com/raw/${url}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log("error", error));
  return res;
};
