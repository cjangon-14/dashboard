export async function loginRequest(credentials) {
  const url = "http://192.168.122.80:8000/api/admin/v1/login";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errResult = await response.json();
    throw new Error(errResult.errors?.details || "Login failed");
  }

  return await response.json();
}

export async function infoRequest(credentials) {
  const url = "http://192.168.122.80:8000/api/admin/v1/user";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errResult = await response.json();
    throw new Error(errResult.errors?.details || "Login failed");
  }

  return await response.json();
}