export async function handleResponse(response) {
  console.log(response);
  if (response.ok) return response.json();
  if (response.status === 400) {
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

export function handleError(error) {
  console.error("API call failed. " + error);
  throw error;
}

export const apiURL =
  process.env.NODE_ENV === "production"
    ? "https://course-management-app-backend.herokuapp.com/"
    : "http://localhost:3001/";
