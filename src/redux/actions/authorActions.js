import * as types from "./actionTypes";
import { beginApiCall, endApiCall } from "./apiStatusActions";
import * as authorApi from "../../api/authorApi";

export function loadAuthorSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorSuccess(authors));
        dispatch(endApiCall());
      })
      .catch((error) => {
        dispatch(endApiCall());
        throw error;
      });
  };
}
