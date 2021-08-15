import { handleResponse, handleError, apiURL } from "./apiUtils";
const baseUrl = apiURL + "authors/";

export function getAuthors() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
