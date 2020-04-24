import {
  ALL_CATEGORIES_GET,
  // ALL_CATEGORIES_GET_REQUEST,
  // ALL_CATEGORIES_GET_SUCCESS,
  // ALL_CATEGORIES_GET_FAILURE,
} from "data/constants";

import API from "data/fetch";

export const fetchAllCategories = () => {
  // dispatch akcje BUDGET_GET_REQUEST
  const promise = API.common.fetchAllCategories();

  return {
    type: ALL_CATEGORIES_GET,
    promise,
  };

  // wykonac request do api
  // try {
  //   const response = await API.common.fetchAllCategories();
  //   const data = await response.json();

  //   dispatch({
  //     type: ALL_CATEGORIES_GET_SUCCESS,
  //     payload: data,
  //   });
  // } catch (err) {
  //   dispatch({
  //     type: ALL_CATEGORIES_GET_FAILURE,
  //   });
  // }

  // po skonczeniu requesta BUDGET_GET_REQUEST przekazac dane z requestu
};
